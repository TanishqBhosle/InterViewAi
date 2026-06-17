import { z } from "zod";
import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";
import { liveScoringEngine } from "./live-scoring";
import { mistakeAnalysisService } from "./mistake-analysis";
import { interviewReplayService } from "./interview-replay";
import { readinessScoreService } from "./readiness-score";
import { improvementRoadmapService } from "./improvement-roadmap";
import { benchmarkingService } from "./benchmarking";

const REPORT_GENERATION_PROMPT = `Generate a comprehensive interview report based on the following data:

Session ID: {sessionId}
Company: {companyName}
Role: {role}
Experience Level: {experienceLevel}
Total Questions: {totalQuestions}
Questions Answered: {questionsAnswered}

Scores:
- Overall: {overallScore}/100
- Technical: {technicalScore}/100
- Communication: {communicationScore}/100
- Confidence: {confidenceScore}/100
- Problem Solving: {problemSolvingScore}/100
- Behavioral: {behavioralScore}/100

Question Details:
{questionDetails}

Generate a detailed report with:
{
  "overallFeedback": "string - comprehensive 2-3 paragraph feedback",
  "strengths": ["string array of top 3-5 strengths"],
  "weaknesses": ["string array of top 3-5 weaknesses"],
  "criticalMistakes": [
    {
      "question": "string",
      "mistake": "string",
      "impact": "string - how this affected the evaluation",
      "correction": "string - how to fix this"
    }
  ],
  "missedOpportunities": [
    {
      "topic": "string",
      "opportunity": "string",
      "suggestion": "string"
    }
  ],
  "recommendations": ["string array of specific action items"],
  "companyFitAnalysis": "string - how well the candidate fits the company culture",
  "roleReadiness": "string - assessment of readiness for the role",
  "interviewTips": ["string array of company-specific tips for next time"]
}

Return ONLY valid JSON, no other text.`;

export const finalReportService = {
  async generateReport(sessionId: string) {
    // Fetch session with all related data
    const session = await prisma.companyInterviewSession.findUnique({
      where: { id: sessionId },
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
        bodyAnalysis: true,
        speechAnalysis: true,
      },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    // Calculate scores
    const scores = this.calculateScores(session);

    // Generate mistake analysis
    const mistakeAnalysis = await mistakeAnalysisService.analyze(sessionId);

    // Generate interview replay
    const questionReplay = await interviewReplayService.generate(sessionId);

    // Generate readiness scores
    const readinessScores = await readinessScoreService.calculate(sessionId);

    // Generate improvement roadmap
    const improvementRoadmap = await improvementRoadmapService.generate(sessionId);

    // Get benchmarking
    const benchmark = await benchmarkingService.compare(
      session.companyId,
      session.role,
      scores.overall
    );

    // Generate detailed feedback via AI
    const questionDetails = session.questions.map((q, i) => {
      const answer = q.answer;
      const evaluation = answer?.evaluation;
      return `Q${i + 1}: ${q.questionText}
Type: ${q.questionType}
Score: ${evaluation?.overallScore || "N/A"}
Answer: ${answer?.answerText?.substring(0, 200) || "No answer"}...`;
    }).join("\n\n");

    const prompt = REPORT_GENERATION_PROMPT
      .replace("{sessionId}", sessionId)
      .replace(/{companyName}/g, session.company.name)
      .replace("{role}", session.role)
      .replace("{experienceLevel}", session.experienceLevel)
      .replace("{totalQuestions}", String(session.totalQuestions))
      .replace("{questionsAnswered}", String(session.questions.filter((q) => q.answer).length))
      .replace("{overallScore}", String(scores.overall))
      .replace("{technicalScore}", String(scores.technical))
      .replace("{communicationScore}", String(scores.communication))
      .replace("{confidenceScore}", String(scores.confidence))
      .replace("{problemSolvingScore}", String(scores.problemSolving))
      .replace("{behavioralScore}", String(scores.behavioral))
      .replace("{questionDetails}", questionDetails);

    let aiReport;
    try {
      const response = await aiService.generateJSON(prompt);
      aiReport = typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("AI report generation failed:", error);
      aiReport = this.getDefaultReport(scores);
    }

    // Get hiring recommendation
    const hiringRec = liveScoringEngine.getHiringRecommendation(scores.overall);

    // Create report in database
    const report = await prisma.companyInterviewReport.create({
      data: {
        sessionId,
        overallScore: scores.overall,
        technicalScore: scores.technical,
        communicationScore: scores.communication,
        confidenceScore: scores.confidence,
        behavioralScore: scores.behavioral,
        problemSolvingScore: scores.problemSolving,
        leadershipScore: scores.leadership,
        projectScore: scores.project,
        aptitudeScore: scores.aptitude,
        bodyLanguageScore: session.bodyAnalysis?.overallScore,
        speechScore: session.speechAnalysis?.overallScore,
        strengths: aiReport.strengths || [],
        weaknesses: aiReport.weaknesses || [],
        criticalMistakes: aiReport.criticalMistakes || [],
        missedOpportunities: aiReport.missedOpportunities || [],
        recommendations: aiReport.recommendations || [],
        detailedFeedback: aiReport.overallFeedback || "",
        hiringRecommendation: hiringRec.recommendation,
        benchmarkPercentile: benchmark.percentile,
        readinessScores,
        improvementRoadmap,
        questionReplay,
        mistakeAnalysis,
      },
    });

    // Update session status
    await prisma.companyInterviewSession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });

    return {
      report,
      scores,
      hiringRecommendation: hiringRec,
      benchmark,
      readinessScores,
      improvementRoadmap,
    };
  },

  calculateScores(session: any) {
    const evaluations = session.questions
      .map((q: any) => q.answer?.evaluation)
      .filter(Boolean);

    if (evaluations.length === 0) {
      return {
        overall: 0,
        technical: 0,
        communication: 0,
        confidence: 0,
        problemSolving: 0,
        behavioral: 0,
        leadership: 0,
        project: 0,
        aptitude: 0,
      };
    }

    return {
      overall: Math.round(evaluations.reduce((s: number, e: any) => s + e.overallScore, 0) / evaluations.length),
      technical: Math.round(evaluations.reduce((s: number, e: any) => s + e.technicalScore, 0) / evaluations.length),
      communication: Math.round(evaluations.reduce((s: number, e: any) => s + e.communicationScore, 0) / evaluations.length),
      confidence: Math.round(evaluations.reduce((s: number, e: any) => s + e.confidenceScore, 0) / evaluations.length),
      problemSolving: Math.round(evaluations.reduce((s: number, e: any) => s + e.problemSolvingScore, 0) / evaluations.length),
      behavioral: Math.round(evaluations.reduce((s: number, e: any) => s + (e.behavioralScore || 70), 0) / evaluations.length),
      leadership: Math.round(evaluations.reduce((s: number, e: any) => s + (e.leadershipScore || 70), 0) / evaluations.length),
      project: Math.round(evaluations.reduce((s: number, e: any) => s + (e.projectScore || 70), 0) / evaluations.length),
      aptitude: Math.round(evaluations.reduce((s: number, e: any) => s + (e.aptitudeScore || 70), 0) / evaluations.length),
    };
  },

  getDefaultReport(scores: any) {
    return {
      overallFeedback: `The candidate scored ${scores.overall}/100 overall. Technical performance: ${scores.technical}/100. Communication: ${scores.communication}/100.`,
      strengths: ["Technical knowledge", "Problem-solving approach"],
      weaknesses: ["Communication clarity", "Time management"],
      criticalMistakes: [],
      missedOpportunities: [],
      recommendations: ["Practice more mock interviews", "Work on communication skills"],
      companyFitAnalysis: "Moderate fit based on available data.",
      roleReadiness: "Partially ready for the role.",
      interviewTips: ["Research the company more", "Practice STAR format answers"],
    };
  },

  async getReport(reportId: string) {
    return prisma.companyInterviewReport.findUnique({
      where: { id: reportId },
      include: {
        session: {
          include: {
            company: true,
            questions: {
              include: {
                answer: {
                  include: {
                    evaluation: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  async getReportsByUser(userId: string) {
    return prisma.companyInterviewReport.findMany({
      where: {
        session: { userId },
      },
      include: {
        session: {
          include: { company: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
