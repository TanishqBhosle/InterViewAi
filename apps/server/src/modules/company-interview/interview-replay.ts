import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";

const REPLAY_GENERATION_PROMPT = `Generate an improved version of this interview answer:

Question: {question}
Question Type: {questionType}
User Answer: {userAnswer}
Current Score: {currentScore}
Feedback: {feedback}

Provide:
{
  "improvedAnswer": "string - improved version of the user's answer",
  "idealAnswer": "string - what an ideal answer would look like",
  "keyImprovements": ["string array of specific improvements made"],
  "tips": ["string array of tips for answering this type of question"]
}

Return ONLY valid JSON, no other text.`;

export const interviewReplayService = {
  async generate(sessionId: string) {
    const session = await prisma.companyInterviewSession.findUnique({
      where: { id: sessionId },
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
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    const replay: any[] = [];

    for (const question of session.questions) {
      const answer = question.answer;
      const evaluation = answer?.evaluation;

      const questionReplay: any = {
        questionId: question.id,
        questionNumber: question.orderIndex,
        question: question.questionText,
        questionType: question.questionType,
        category: question.category,
        difficulty: question.difficulty,
        userAnswer: answer?.answerText || null,
        evaluation: evaluation
          ? {
              technicalScore: evaluation.technicalScore,
              communicationScore: evaluation.communicationScore,
              confidenceScore: evaluation.confidenceScore,
              problemSolvingScore: evaluation.problemSolvingScore,
              overallScore: evaluation.overallScore,
              feedback: evaluation.feedback,
              strengths: evaluation.strengths,
              improvements: evaluation.improvements,
            }
          : null,
        idealAnswer: evaluation?.idealAnswer || null,
        improvedAnswer: evaluation?.improvedAnswer || null,
        followUpSuggestion: evaluation?.followUpSuggestion || null,
        interviewerPerception: evaluation?.interviewerPerception || null,
      };

      // Generate improved answer if not already provided
      if (!questionReplay.improvedAnswer && answer?.answerText && evaluation) {
        try {
          const prompt = REPLAY_GENERATION_PROMPT
            .replace("{question}", question.questionText)
            .replace("{questionType}", question.questionType)
            .replace("{userAnswer}", answer.answerText)
            .replace("{currentScore}", String(evaluation.overallScore))
            .replace("{feedback}", evaluation.feedback || "No feedback");

          const response = await aiService.generateJSON(prompt);
          const improvements = typeof response === "string" ? JSON.parse(response) : response;

          questionReplay.improvedAnswer = improvements.improvedAnswer;
          questionReplay.idealAnswer = improvements.idealAnswer;
          questionReplay.keyImprovements = improvements.keyImprovements;
          questionReplay.tips = improvements.tips;
        } catch (error) {
          console.error("Failed to generate improved answer for question", question.id);
        }
      }

      replay.push(questionReplay);
    }

    return replay;
  },

  async getReplay(sessionId: string) {
    const report = await prisma.companyInterviewReport.findUnique({
      where: { sessionId },
      select: { questionReplay: true },
    });

    return report?.questionReplay || [];
  },

  getReplaySummary(replay: any[]) {
    const totalQuestions = replay.length;
    const answered = replay.filter((r) => r.userAnswer).length;
    const avgScore =
      replay
        .filter((r) => r.evaluation)
        .reduce((sum, r) => sum + (r.evaluation?.overallScore || 0), 0) / Math.max(answered, 1);

    const strongAreas = replay
      .filter((r) => r.evaluation?.overallScore >= 70)
      .map((r) => r.category || r.questionType);

    const weakAreas = replay
      .filter((r) => r.evaluation?.overallScore < 60)
      .map((r) => r.category || r.questionType);

    const questionTypePerformance = this.groupByQuestionType(replay);

    return {
      totalQuestions,
      answered,
      avgScore: Math.round(avgScore),
      strongAreas: [...new Set(strongAreas)],
      weakAreas: [...new Set(weakAreas)],
      questionTypePerformance,
      missedQuestions: totalQuestions - answered,
    };
  },

  groupByQuestionType(replay: any[]) {
    const groups: Record<string, { count: number; avgScore: number }> = {};

    for (const item of replay) {
      const type = item.questionType;
      if (!groups[type]) {
        groups[type] = { count: 0, avgScore: 0 };
      }
      groups[type].count++;
      if (item.evaluation) {
        groups[type].avgScore += item.evaluation.overallScore;
      }
    }

    // Calculate averages
    for (const type of Object.keys(groups)) {
      groups[type].avgScore = Math.round(groups[type].avgScore / groups[type].count);
    }

    return groups;
  },

  formatReplayForDisplay(replay: any[]) {
    return replay.map((item, index) => ({
      number: index + 1,
      question: item.question,
      type: item.questionType,
      difficulty: item.difficulty,
      score: item.evaluation?.overallScore || "N/A",
      yourAnswer: item.userAnswer
        ? item.userAnswer.length > 200
          ? item.userAnswer.substring(0, 200) + "..."
          : item.userAnswer
        : "Not answered",
      feedback: item.evaluation?.feedback || "No feedback available",
      idealAnswer: item.idealAnswer || "Not available",
      improvedAnswer: item.improvedAnswer || "Not available",
      strengths: item.evaluation?.strengths || [],
      improvements: item.evaluation?.improvements || [],
    }));
  },
};
