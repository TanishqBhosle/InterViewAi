import { prisma } from "@/config/database";

export const readinessScoreService = {
  async calculate(sessionId: string) {
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
        },
        bodyAnalysis: true,
        speechAnalysis: true,
      },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    const evaluations = session.questions
      .map((q) => q.answer?.evaluation)
      .filter(Boolean);

    // Calculate component scores
    const companyReadiness = this.calculateCompanyReadiness(session, evaluations);
    const roleReadiness = this.calculateRoleReadiness(session, evaluations);
    const technicalReadiness = this.calculateTechnicalReadiness(evaluations);
    const communicationReadiness = this.calculateCommunicationReadiness(session, evaluations);
    const behavioralReadiness = this.calculateBehavioralReadiness(evaluations);

    const overallReadiness = Math.round(
      companyReadiness * 0.2 +
      roleReadiness * 0.2 +
      technicalReadiness * 0.3 +
      communicationReadiness * 0.15 +
      behavioralReadiness * 0.15
    );

    return {
      overall: overallReadiness,
      company: companyReadiness,
      role: roleReadiness,
      technical: technicalReadiness,
      communication: communicationReadiness,
      behavioral: behavioralReadiness,
      status: this.getReadinessStatus(overallReadiness),
      breakdown: this.getReadinessBreakdown(overallReadiness),
      gaps: this.identifyGaps(session, evaluations),
    };
  },

  calculateCompanyReadiness(session: any, evaluations: any[]): number {
    // Company readiness based on cultural fit signals and company-specific knowledge
    const companyValues = session.company.values as string[] || [];
    const interviewProcess = session.company.interviewProcess as any;

    let score = 60; // Base score

    // Bonus for answering company-specific questions well
    const companyQuestions = session.questions.filter(
      (q) => q.questionType === "behavioral" || q.category?.includes("company")
    );
    const companyQuestionScores = companyQuestions
      .map((q) => q.answer?.evaluation?.overallScore)
      .filter(Boolean);

    if (companyQuestionScores.length > 0) {
      const avgCompanyScore = companyQuestionScores.reduce((a: number, b: number) => a + b, 0) / companyQuestionScores.length;
      score = Math.round(avgCompanyScore);
    }

    return Math.min(100, Math.max(0, score));
  },

  calculateRoleReadiness(session: any, evaluations: any[]): number {
    // Role readiness based on matching required skills
    const blueprint = session.blueprint;
    if (!blueprint) return 65;

    const requiredSkills = blueprint.requiredSkills as any[] || [];
    const topicWeightings = blueprint.topicWeightings as Record<string, number> || {};

    let score = 0;
    let totalWeight = 0;

    for (const [topic, weight] of Object.entries(topicWeightings)) {
      const topicQuestions = session.questions.filter(
        (q) => q.category?.toLowerCase().includes(topic.toLowerCase())
      );
      const topicScores = topicQuestions
        .map((q) => q.answer?.evaluation?.overallScore)
        .filter(Boolean);

      if (topicScores.length > 0) {
        const avgScore = topicScores.reduce((a: number, b: number) => a + b, 0) / topicScores.length;
        score += avgScore * (weight / 100);
      }
      totalWeight += weight;
    }

    return totalWeight > 0 ? Math.round(score) : 65;
  },

  calculateTechnicalReadiness(evaluations: any[]): number {
    if (evaluations.length === 0) return 50;

    const technicalScores = evaluations.map((e) => e.technicalScore);
    const problemSolvingScores = evaluations.map((e) => e.problemSolvingScore);

    const avgTechnical = technicalScores.reduce((a: number, b: number) => a + b, 0) / technicalScores.length;
    const avgProblemSolving = problemSolvingScores.reduce((a: number, b: number) => a + b, 0) / problemSolvingScores.length;

    return Math.round(avgTechnical * 0.7 + avgProblemSolving * 0.3);
  },

  calculateCommunicationReadiness(session: any, evaluations: any[]): number {
    let score = 70; // Base score

    // Factor in speech analysis if available
    if (session.speechAnalysis) {
      score = Math.round(session.speechAnalysis.overallScore);
    } else if (evaluations.length > 0) {
      const commScores = evaluations.map((e) => e.communicationScore);
      score = Math.round(commScores.reduce((a: number, b: number) => a + b, 0) / commScores.length);
    }

    return Math.min(100, Math.max(0, score));
  },

  calculateBehavioralReadiness(evaluations: any[]): number {
    if (evaluations.length === 0) return 60;

    const behavioralScores = evaluations
      .map((e) => e.behavioralScore)
      .filter(Boolean);

    if (behavioralScores.length === 0) return 60;

    return Math.round(
      behavioralScores.reduce((a: number, b: number) => a + b, 0) / behavioralScores.length
    );
  },

  getReadinessStatus(score: number): string {
    if (score >= 85) return "Ready";
    if (score >= 70) return "Partially Ready";
    if (score >= 50) return "Needs Improvement";
    return "Not Ready";
  },

  getReadinessBreakdown(score: number) {
    if (score >= 85) {
      return {
        status: "Ready",
        message: "You are well-prepared for this interview. Focus on maintaining your performance.",
        actionItems: ["Review key concepts", "Practice mock interviews", "Research company updates"],
      };
    } else if (score >= 70) {
      return {
        status: "Partially Ready",
        message: "You have a good foundation but need to strengthen some areas.",
        actionItems: ["Focus on weak areas", "Practice more questions", "Improve communication"],
      };
    } else if (score >= 50) {
      return {
        status: "Needs Improvement",
        message: "Significant preparation needed before the interview.",
        actionItems: ["Study core concepts", "Practice daily", "Get feedback from peers"],
      };
    } else {
      return {
        status: "Not Ready",
        message: "Extensive preparation required. Consider delaying the interview if possible.",
        actionItems: ["Start with fundamentals", "Create a study plan", "Seek mentorship"],
      };
    }
  },

  identifyGaps(session: any, evaluations: any[]) {
    const gaps: Array<{ area: string; currentLevel: number; targetLevel: number; priority: string }> = [];

    // Technical gaps
    if (evaluations.length > 0) {
      const avgTechnical = evaluations.reduce((s: number, e: any) => s + e.technicalScore, 0) / evaluations.length;
      if (avgTechnical < 70) {
        gaps.push({
          area: "Technical Knowledge",
          currentLevel: Math.round(avgTechnical),
          targetLevel: 75,
          priority: avgTechnical < 50 ? "high" : "medium",
        });
      }

      const avgComm = evaluations.reduce((s: number, e: any) => s + e.communicationScore, 0) / evaluations.length;
      if (avgComm < 70) {
        gaps.push({
          area: "Communication",
          currentLevel: Math.round(avgComm),
          targetLevel: 75,
          priority: avgComm < 50 ? "high" : "medium",
        });
      }

      const avgConf = evaluations.reduce((s: number, e: any) => s + e.confidenceScore, 0) / evaluations.length;
      if (avgConf < 70) {
        gaps.push({
          area: "Confidence",
          currentLevel: Math.round(avgConf),
          targetLevel: 75,
          priority: "medium",
        });
      }
    }

    // Body language gaps
    if (session.bodyAnalysis && session.bodyAnalysis.overallScore < 70) {
      gaps.push({
        area: "Body Language",
        currentLevel: session.bodyAnalysis.overallScore,
        targetLevel: 75,
        priority: "medium",
      });
    }

    return gaps;
  },

  getTargetScores(role: string, experienceLevel: string): Record<string, number> {
    const baseTargets: Record<string, number> = {
      technical: 75,
      communication: 70,
      confidence: 70,
      problemSolving: 70,
      behavioral: 65,
    };

    // Adjust based on experience level
    if (experienceLevel.includes("SENIOR") || experienceLevel.includes("STAFF")) {
      baseTargets.technical = 85;
      baseTargets.communication = 80;
      baseTargets.confidence = 80;
      baseTargets.problemSolving = 85;
      baseTargets.behavioral = 80;
    } else if (experienceLevel.includes("FRESHER") || experienceLevel.includes("JUNIOR")) {
      baseTargets.technical = 65;
      baseTargets.communication = 65;
      baseTargets.confidence = 65;
      baseTargets.problemSolving = 65;
      baseTargets.behavioral = 60;
    }

    return baseTargets;
  },
};
