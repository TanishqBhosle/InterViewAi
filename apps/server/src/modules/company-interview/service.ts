import { z } from "zod";
import { prisma } from "@/config/database";
import { companyAnalysisService } from "./company-analysis";
import { roleAnalysisService } from "./role-analysis";
import { blueprintService } from "./blueprint";
import { technicalQuestionEngine } from "./technical-engine";
import { behavioralQuestionEngine } from "./behavioral-engine";
import { aptitudeQuestionEngine } from "./aptitude-engine";
import { communicationAnalysisService } from "./communication-analysis";
import { bodyLanguageService } from "./body-language";
import { liveScoringEngine, type LiveScore, type RunningAverage } from "./live-scoring";
import { finalReportService } from "./final-report";
import { aiService } from "@/services/ai";

const startSessionSchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  experienceLevel: z.string().min(1),
  jobDescription: z.string().optional(),
  resumeData: z.any().optional(),
  cameraEnabled: z.boolean().default(false),
  microphoneEnabled: z.boolean().default(false),
  interviewDuration: z.number().default(45),
});

const submitAnswerSchema = z.object({
  questionId: z.string().uuid(),
  answerText: z.string().min(1),
  audioUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.number().optional(),
});

interface InterviewState {
  sessionId: string;
  currentQuestion: number;
  totalQuestions: number;
  runningAverage: RunningAverage;
  scores: LiveScore[];
}

const interviewStates = new Map<string, InterviewState>();

export const companyInterviewService = {
  async startSession(userId: string, data: z.infer<typeof startSessionSchema>) {
    const validated = startSessionSchema.parse(data);

    // Generate blueprint
    const { blueprint, company, roleAnalysis, topicWeightings, difficulty } =
      await blueprintService.generate({
        companyName: validated.companyName,
        role: validated.role,
        experienceLevel: validated.experienceLevel,
        jobDescription: validated.jobDescription,
        resumeData: validated.resumeData,
      });

    // Create session
    const session = await prisma.companyInterviewSession.create({
      data: {
        userId,
        companyId: company.id,
        blueprintId: blueprint.id,
        role: validated.role,
        experienceLevel: validated.experienceLevel,
        jobDescription: validated.jobDescription ? { text: validated.jobDescription } : null,
        resumeData: validated.resumeData,
        cameraEnabled: validated.cameraEnabled,
        microphoneEnabled: validated.microphoneEnabled,
        totalQuestions: blueprint.totalQuestions,
        interviewerPersonality: this.getInterviewerPersonality(),
      },
    });

    // Generate questions based on blueprint
    const questions = await this.generateQuestions({
      session,
      company,
      blueprint,
      topicWeightings,
      difficulty,
      roleAnalysis,
    });

    // Save questions to database
    const savedQuestions = await prisma.companyInterviewQuestion.createMany({
      data: questions.map((q, index) => ({
        sessionId: session.id,
        questionText: q.question,
        questionType: q.type,
        category: q.category,
        difficulty: q.difficulty || difficulty,
        topicWeight: q.topicWeight || 10,
        orderIndex: index + 1,
      })),
    });

    // Fetch saved questions with IDs
    const sessionQuestions = await prisma.companyInterviewQuestion.findMany({
      where: { sessionId: session.id },
      orderBy: { orderIndex: "asc" },
    });

    // Initialize interview state
    interviewStates.set(session.id, {
      sessionId: session.id,
      currentQuestion: 0,
      totalQuestions: sessionQuestions.length,
      runningAverage: liveScoringEngine.getInitialAverage(),
      scores: [],
    });

    // Start the session
    await prisma.companyInterviewSession.update({
      where: { id: session.id },
      data: { status: "in_progress", startedAt: new Date() },
    });

    return {
      sessionId: session.id,
      company: {
        name: company.name,
        industry: company.industry,
        description: company.description,
      },
      role: validated.role,
      experienceLevel: validated.experienceLevel,
      questions: sessionQuestions,
      blueprint: {
        topicWeightings,
        difficulty,
        totalQuestions: sessionQuestions.length,
      },
      interviewerPersonality: session.interviewerPersonality,
    };
  },

  async submitAnswer(userId: string, data: z.infer<typeof submitAnswerSchema>) {
    const validated = submitAnswerSchema.parse(data);

    // Get question and verify ownership
    const question = await prisma.companyInterviewQuestion.findUnique({
      where: { id: validated.questionId },
      include: { session: { select: { userId: true, companyId: true, role: true } } },
    });

    if (!question || question.session.userId !== userId) {
      throw new Error("Question not found or access denied");
    }

    // Save answer
    const answer = await prisma.companyInterviewAnswer.create({
      data: {
        questionId: validated.questionId,
        answerText: validated.answerText,
        audioUrl: validated.audioUrl,
        videoUrl: validated.videoUrl,
        mode: validated.videoUrl ? "VIDEO" : validated.audioUrl ? "VOICE" : "TEXT",
        duration: validated.duration,
      },
    });

    // Analyze communication
    const communicationAnalysis = await communicationAnalysisService.analyze({
      question: question.questionText,
      answer: validated.answerText,
      duration: validated.duration || 60,
    });

    // Update answer with communication analysis
    await prisma.companyInterviewAnswer.update({
      where: { id: answer.id },
      data: {
        fillerWords: communicationAnalysis.detectedFillers,
        speakingSpeed: communicationAnalysis.speakingSpeed,
        grammarScore: communicationAnalysis.grammarScore,
      },
    });

    // Evaluate answer
    const company = await prisma.companyProfile.findUnique({
      where: { id: question.session.companyId },
    });

    let evaluation;
    if (question.questionType === "behavioral") {
      const companyValues = (company?.values as string[]) || [];
      evaluation = await behavioralQuestionEngine.evaluateAnswer({
        question: question.questionText,
        answer: validated.answerText,
        competency: question.category || "General",
        companyValues,
      });
    } else if (question.questionType === "aptitude") {
      // For aptitude, check if answer matches expected
      evaluation = {
        technicalScore: 70,
        communicationScore: communicationAnalysis.communicationScore,
        confidenceScore: 70,
        problemSolvingScore: 70,
        overallScore: communicationAnalysis.communicationScore,
        feedback: "Answer evaluated.",
        strengths: [],
        improvements: [],
      };
    } else {
      evaluation = await technicalQuestionEngine.evaluateAnswer({
        question: question.questionText,
        answer: validated.answerText,
        questionType: question.questionType,
        scoringCriteria: {},
        difficulty: question.difficulty,
      });
    }

    // Save evaluation
    await prisma.companyInterviewEvaluation.create({
      data: {
        answerId: answer.id,
        technicalScore: evaluation.technicalScore || 0,
        communicationScore: evaluation.communicationScore || communicationAnalysis.communicationScore,
        confidenceScore: evaluation.confidenceScore || 0,
        problemSolvingScore: evaluation.problemSolvingScore || 0,
        behavioralScore: evaluation.behavioralScore || 0,
        projectScore: evaluation.projectScore || 0,
        overallScore: evaluation.overallScore || 0,
        feedback: evaluation.feedback,
        strengths: evaluation.strengths || [],
        improvements: evaluation.improvements || [],
        idealAnswer: evaluation.idealAnswer,
        improvedAnswer: evaluation.improvedAnswer,
        followUpSuggestion: evaluation.followUpSuggestion,
        interviewerPerception: evaluation.interviewerPerception,
      },
    });

    // Update running average
    const state = interviewStates.get(question.session.userId + "_" + question.session.companyId);
    if (state) {
      const liveScore = liveScoringEngine.calculateQuestionScore({
        evaluation,
        questionType: question.questionType,
        topicWeight: question.topicWeight || 10,
        difficulty: question.difficulty,
      });
      liveScore.questionId = question.id;

      state.scores.push(liveScore);
      state.runningAverage = liveScoringEngine.updateRunningAverage(state.runningAverage, liveScore);
      state.currentQuestion++;
    }

    // Get performance trend
    const state2 = interviewStates.get(question.session.userId + "_" + question.session.companyId);
    const trend = state2 ? liveScoringEngine.getPerformanceTrend(state2.scores) : null;

    return {
      answerId: answer.id,
      evaluation: {
        technicalScore: evaluation.technicalScore,
        communicationScore: evaluation.communicationScore,
        confidenceScore: evaluation.confidenceScore,
        overallScore: evaluation.overallScore,
        feedback: evaluation.feedback,
        strengths: evaluation.strengths,
        improvements: evaluation.improvements,
      },
      communication: {
        speakingSpeed: communicationAnalysis.speakingSpeed,
        fillerWordCount: communicationAnalysis.detectedFillers?.length || 0,
        suggestions: communicationAnalysis.suggestions,
      },
      trend,
      followUpSuggestion: evaluation.followUpSuggestion,
    };
  },

  async endSession(sessionId: string, userId: string) {
    // Verify ownership
    const session = await prisma.companyInterviewSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new Error("Session not found or access denied");
    }

    // Generate final report
    const report = await finalReportService.generateReport(sessionId);

    // Clean up state
    interviewStates.delete(sessionId);

    return report;
  },

  async getSession(sessionId: string, userId: string) {
    const session = await prisma.companyInterviewSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        company: true,
        blueprint: true,
        questions: {
          include: {
            answer: {
              include: {
                evaluation: true,
              },
            },
          },
          orderBy: { orderIndex: "asc" },
        },
        report: true,
        bodyAnalysis: true,
        speechAnalysis: true,
      },
    });

    if (!session) {
      throw new Error("Session not found or access denied");
    }

    const state = interviewStates.get(sessionId);
    const currentQuestionIndex = state?.currentQuestion || session.currentQuestion;

    return {
      ...session,
      currentQuestionIndex,
      runningAverage: state?.runningAverage || null,
      trend: state?.scores ? liveScoringEngine.getPerformanceTrend(state.scores) : null,
    };
  },

  async getSessionsByUser(userId: string) {
    return prisma.companyInterviewSession.findMany({
      where: { userId },
      include: {
        company: true,
        report: {
          select: {
            overallScore: true,
            hiringRecommendation: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async generateFollowUp(params: {
    sessionId: string;
    questionId: string;
    answer: string;
    evaluation: any;
  }) {
    const question = await prisma.companyInterviewQuestion.findUnique({
      where: { id: params.questionId },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    const FOLLOW_UP_PROMPT = `You are a senior interviewer at a tech company. Based on the candidate's answer, generate a follow-up question.

Original Question: ${question.questionText}
Candidate's Answer: ${params.answer}
Score: ${params.evaluation.overallScore}/100
Weakness: ${params.evaluation.improvements?.[0] || "None identified"}

Generate a follow-up question that:
1. Tests deeper understanding
2. Challenges the candidate's assumptions
3. Probes areas where the answer was weak

Return ONLY the follow-up question as a string, no JSON formatting.`;

    try {
      const response = await aiService.generateText(FOLLOW_UP_PROMPT);
      return {
        followUpQuestion: response,
        isFollowUp: true,
        parentQuestionId: params.questionId,
      };
    } catch (error) {
      return {
        followUpQuestion: "Can you elaborate more on that point?",
        isFollowUp: true,
        parentQuestionId: params.questionId,
      };
    }
  },

  async generateQuestions(params: {
    session: any;
    company: any;
    blueprint: any;
    topicWeightings: Record<string, number>;
    difficulty: string;
    roleAnalysis: any;
  }) {
    const allQuestions: any[] = [];
    const { company, blueprint, topicWeightings, difficulty, roleAnalysis } = params;

    // Generate technical questions based on topic weightings
    for (const [topic, weight] of Object.entries(topicWeightings)) {
      if (weight < 5) continue;

      const questionCount = Math.max(1, Math.round((weight / 100) * blueprint.totalQuestions));

      const technicalQuestions = await technicalQuestionEngine.generateQuestions({
        companyName: company.name,
        role: params.session.role,
        topic,
        category: topic,
        count: questionCount,
        difficulty,
        techStack: (company.techStack as string[]) || [],
        experienceLevel: params.session.experienceLevel,
      });

      technicalQuestions.forEach((q: any) => {
        allQuestions.push({
          question: q.question,
          type: q.type || "technical",
          category: topic,
          difficulty: q.difficulty || difficulty,
          topicWeight: weight,
        });
      });
    }

    // Generate behavioral questions
    const behavioralCount = Math.max(2, Math.round(blueprint.totalQuestions * 0.2));
    const companyValues = (company.values as string[]) || [];
    const behavioralFocus = (blueprint.behavioralFocus as any) || {};
    const focusAreas = Object.keys(behavioralFocus).filter((k) => behavioralFocus[k]);

    const behavioralQuestions = await behavioralQuestionEngine.generateQuestions({
      companyName: company.name,
      role: params.session.role,
      experienceLevel: params.session.experienceLevel,
      companyValues,
      focusAreas,
      count: behavioralCount,
    });

    behavioralQuestions.forEach((q: any) => {
      allQuestions.push({
        question: q.question,
        type: "behavioral",
        category: q.competency,
        difficulty: "MEDIUM",
        topicWeight: 10,
      });
    });

    // Add company-specific behavioral questions
    const companySpecific = behavioralQuestionEngine.getCompanySpecificQuestions(company.name);
    companySpecific.slice(0, 2).forEach((q) => {
      allQuestions.push({
        question: q.question,
        type: "behavioral",
        category: q.competency,
        difficulty: "MEDIUM",
        topicWeight: 10,
      });
    });

    // Shuffle and limit questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, blueprint.totalQuestions);
  },

  getInterviewerPersonality() {
    const personalities = ["strict", "friendly", "neutral", "challenging"];
    return personalities[Math.floor(Math.random() * personalities.length)];
  },
};
