import { z } from "zod";
import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";
import type { InterviewType, InterviewDifficulty } from "@prisma/client";

const createSchema = z.object({
  role: z.string().min(1, "Role is required"),
  type: z.string().min(1, "Interview type is required"),
  difficulty: z.string().default("MEDIUM"),
  count: z.number().int().min(1).max(20).default(10),
});

export const interviewService = {
  async create(userId: string, data: z.infer<typeof createSchema>) {
    const validated = createSchema.parse(data);

    const interview = await prisma.interview.create({
      data: {
        userId,
        role: validated.role,
        type: validated.type as InterviewType,
        difficulty: validated.difficulty as InterviewDifficulty,
        totalQuestions: validated.count,
      },
    });

    // Generate questions via AI
    try {
      const questions = await aiService.generateQuestions({
        type: validated.type,
        difficulty: validated.difficulty,
        role: validated.role,
        count: validated.count,
      });

      await prisma.question.createMany({
        data: questions.map((text, index) => ({
          interviewId: interview.id,
          questionText: text,
          orderIndex: index + 1,
          difficulty: validated.difficulty as InterviewDifficulty,
        })),
      });
    } catch {
      console.warn("AI question generation failed, interview created without questions");
    }

    return interview;
  },

  async getById(id: string, userId: string) {
    return prisma.interview.findFirst({
      where: { id, userId },
      include: { questions: { include: { answer: { include: { evaluation: true } } } }, report: true },
    });
  },

  async getByUser(userId: string) {
    return prisma.interview.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async submitAnswer(questionId: string, userId: string, data: { answerText?: string; audioUrl?: string; videoUrl?: string }) {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { interview: { select: { userId: true } } },
    });
    if (!question || question.interview.userId !== userId) {
      throw new Error("Question not found or access denied");
    }

    const answer = await prisma.answer.upsert({
      where: { questionId },
      update: { answerText: data.answerText, audioUrl: data.audioUrl, videoUrl: data.videoUrl },
      create: { questionId, ...data },
    });

    // Evaluate answer via AI
    if (data.answerText) {
      try {
        const evaluation = await aiService.evaluateAnswer(question.questionText, data.answerText);
        await prisma.evaluation.upsert({
          where: { answerId: answer.id },
          update: evaluation,
          create: { answerId: answer.id, ...evaluation },
        });
      } catch {
        console.warn("AI evaluation failed for answer", answer.id);
      }
    }

    await prisma.interview.update({
      where: { id: question.interviewId },
      data: { answeredCount: { increment: 1 } },
    });

    return answer;
  },

  async complete(interviewId: string, userId: string) {
    const interview = await prisma.interview.findFirst({
      where: { id: interviewId, userId },
      include: {
        questions: { include: { answer: { include: { evaluation: true } } } },
      },
    });
    if (!interview) throw new Error("Interview not found or access denied");

    const evaluations = interview.questions
      .map((q) => q.answer?.evaluation)
      .filter(Boolean);

    if (evaluations.length > 0) {
      const evals = evaluations as NonNullable<typeof evaluations[0]>[];
      const overallScore = Math.round(evals.reduce((s, e) => s + e.overallScore, 0) / evals.length);
      const technicalScore = Math.round(evals.reduce((s, e) => s + e.technicalScore, 0) / evals.length);
      const communicationScore = Math.round(evals.reduce((s, e) => s + e.communicationScore, 0) / evals.length);
      const confidenceScore = Math.round(evals.reduce((s, e) => s + e.confidenceScore, 0) / evals.length);

      const report = await prisma.report.create({
        data: {
          interviewId,
          overallScore,
          technicalScore,
          communicationScore,
          confidenceScore,
          strengths: [],
          weaknesses: [],
          recommendations: [],
          detailedFeedback: "Your interview has been evaluated. Review the scores below.",
        },
      });

      await prisma.interview.update({
        where: { id: interviewId },
        data: { status: "COMPLETED", completedAt: new Date() },
      });

      return report;
    }

    return prisma.interview.update({
      where: { id: interviewId },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
  },

  async getReport(reportId: string, userId: string) {
    return prisma.report.findFirst({
      where: { id: reportId, interview: { userId } },
    });
  },
};
