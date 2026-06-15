import { z } from "zod";
import { prisma } from "@/config/database";

export const interviewService = {
  async create(userId: string, data: { role: string; type: string; difficulty: string }) {
    const interview = await prisma.interview.create({
      data: { userId, role: data.role, type: data.type, difficulty: data.difficulty },
    });
    return interview;
  },

  async getById(id: string) {
    return prisma.interview.findUnique({
      where: { id },
      include: { questions: { include: { answer: { include: { evaluation: true } } } }, report: true },
    });
  },

  async getByUser(userId: string) {
    return prisma.interview.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async addQuestion(interviewId: string, questionText: string, expectedAnswer?: string) {
    const count = await prisma.question.count({ where: { interviewId } });
    return prisma.question.create({
      data: { interviewId, questionText, expectedAnswer, orderIndex: count + 1 },
    });
  },

  async submitAnswer(questionId: string, data: { answerText?: string; audioUrl?: string; videoUrl?: string }) {
    return prisma.answer.create({ data: { questionId, ...data } });
  },

  async complete(interviewId: string) {
    return prisma.interview.update({
      where: { id: interviewId },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
  },

  async getReport(reportId: string) {
    return prisma.report.findUnique({ where: { id: reportId } });
  },
};
