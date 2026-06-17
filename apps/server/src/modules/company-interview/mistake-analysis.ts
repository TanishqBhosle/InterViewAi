import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";

const MISTAKE_ANALYSIS_PROMPT = `Analyze the following interview mistakes and provide detailed breakdown:

Company: {companyName}
Role: {role}
Questions and Answers:
{questionData}

For each mistake, provide:
{
  "mistakes": [
    {
      "questionId": "string",
      "question": "string",
      "userAnswer": "string - brief summary",
      "mistake": "string - what went wrong",
      "whyProblematic": "string - why this is a problem",
      "interviewerPerception": "string - how the interviewer perceived it",
      "howToImprove": "string - specific improvement advice",
      "exampleAnswer": "string - what an ideal answer would look like",
      "correctedAnswer": "string - improved version of their answer",
      "severity": "critical/moderate/minor",
      "category": "technical/communication/structure/confidence"
    }
  ],
  "topMistakes": ["string array of top 3 most critical mistakes"],
  "patterns": ["string array of recurring mistake patterns"],
  "quickWins": ["string array of easy fixes that would immediately improve score"]
}

Return ONLY valid JSON, no other text.`;

export const mistakeAnalysisService = {
  async analyze(sessionId: string) {
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

    // Build question data for AI analysis
    const questionData = session.questions
      .filter((q) => q.answer)
      .map((q, i) => {
        const evaluation = q.answer?.evaluation;
        return `Q${i + 1} (${q.questionType}, ${q.difficulty}):
Question: ${q.questionText}
Answer: ${q.answer?.answerText || "No answer"}
Score: ${evaluation?.overallScore || "N/A"}
Feedback: ${evaluation?.feedback || "No feedback"}`;
      })
      .join("\n\n");

    if (!questionData) {
      return {
        mistakes: [],
        topMistakes: [],
        patterns: [],
        quickWins: [],
      };
    }

    const prompt = MISTAKE_ANALYSIS_PROMPT
      .replace(/{companyName}/g, session.company.name)
      .replace("{role}", session.role)
      .replace("{questionData}", questionData);

    try {
      const response = await aiService.generateJSON(prompt);
      const analysis = typeof response === "string" ? JSON.parse(response) : response;
      return analysis;
    } catch (error) {
      console.error("Mistake analysis failed:", error);
      return this.localAnalysis(session);
    }
  },

  localAnalysis(session: any) {
    const mistakes: any[] = [];
    const topMistakes: string[] = [];
    const patterns: string[] = [];
    const quickWins: string[] = [];

    for (const question of session.questions) {
      if (!question.answer?.evaluation) continue;

      const evaluation = question.answer.evaluation;
      const answer = question.answer;

      // Check for low scores
      if (evaluation.technicalScore < 50) {
        mistakes.push({
          questionId: question.id,
          question: question.questionText,
          userAnswer: answer.answerText?.substring(0, 100) || "No answer",
          mistake: "Insufficient technical depth or incorrect information",
          whyProblematic: "Shows gaps in technical knowledge required for the role",
          interviewerPerception: "Interviewer may question technical competence",
          howToImprove: "Study the core concepts more deeply and practice explaining them",
          exampleAnswer: "Provide a comprehensive answer with examples and real-world applications",
          correctedAnswer: "Review the ideal answer and practice articulating key points",
          severity: "critical",
          category: "technical",
        });
      }

      if (evaluation.communicationScore < 50) {
        mistakes.push({
          questionId: question.id,
          question: question.questionText,
          userAnswer: answer.answerText?.substring(0, 100) || "No answer",
          mistake: "Poor communication or unclear explanation",
          whyProblematic: "Interviewers need to understand your thought process clearly",
          interviewerPerception: "May struggle to communicate technical concepts to the team",
          howToImprove: "Practice explaining concepts clearly and concisely",
          exampleAnswer: "Structure your answer with clear points and examples",
          correctedAnswer: "Rewrite the answer with better structure and clarity",
          severity: "moderate",
          category: "communication",
        });
      }

      if (evaluation.confidenceScore < 50) {
        mistakes.push({
          questionId: question.id,
          question: question.questionText,
          userAnswer: answer.answerText?.substring(0, 100) || "No answer",
          mistake: "Lack of confidence or hesitation in response",
          whyProblematic: "Confidence is key in interviews - it shows competence",
          interviewerPerception: "May not be confident enough to handle the role's challenges",
          howToImprove: "Practice answering confidently and use supporting examples",
          exampleAnswer: "Answer with conviction and provide specific examples",
          correctedAnswer: "Rephrase with more confident language",
          severity: "moderate",
          category: "confidence",
        });
      }

      // Check for filler words
      if (answer.fillerWords && Array.isArray(answer.fillerWords)) {
        const fillerCount = (answer.fillerWords as any[]).length;
        if (fillerCount > 5) {
          patterns.push("Frequent use of filler words");
          quickWins.reduce
          quickWins.push("Practice pausing instead of using filler words like 'um' and 'uh'");
        }
      }
    }

    // Identify patterns
    const technicalMistakes = mistakes.filter((m) => m.category === "technical").length;
    const communicationMistakes = mistakes.filter((m) => m.category === "communication").length;

    if (technicalMistakes > 2) {
      patterns.push("Multiple technical knowledge gaps");
    }
    if (communicationMistakes > 2) {
      patterns.push("Consistent communication issues");
    }

    // Top mistakes (sorted by severity)
    const severityOrder = { critical: 0, moderate: 1, minor: 2 };
    const sortedMistakes = [...mistakes].sort(
      (a, b) => severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder]
    );
    topMistakes.push(...sortedMistakes.slice(0, 3).map((m) => m.mistake));

    // Quick wins
    quickWins.push(
      "Review and practice the ideal answers for missed questions",
      "Structure answers using STAR format for behavioral questions",
      "Research the company's recent projects and achievements"
    );

    return {
      mistakes,
      topMistakes,
      patterns: [...new Set(patterns)],
      quickWins: [...new Set(quickWins)],
    };
  },

  getMistakeCategories() {
    return [
      {
        id: "technical",
        name: "Technical Knowledge",
        description: "Gaps in required technical skills or concepts",
        impact: "high",
      },
      {
        id: "communication",
        name: "Communication",
        description: "Issues with clarity, structure, or articulation",
        impact: "high",
      },
      {
        id: "confidence",
        name: "Confidence",
        description: "Lack of conviction or hesitation in responses",
        impact: "medium",
      },
      {
        id: "structure",
        name: "Answer Structure",
        description: "Poor organization or missing key components",
        impact: "medium",
      },
      {
        id: "depth",
        name: "Depth of Answer",
        description: "Answers too shallow or missing important details",
        impact: "high",
      },
      {
        id: "examples",
        name: "Lack of Examples",
        description: "Missing concrete examples or real-world applications",
        impact: "medium",
      },
    ];
  },

  getImprovementStrategies(category: string): string[] {
    const strategies: Record<string, string[]> = {
      technical: [
        "Review core concepts for each topic area",
        "Practice coding problems daily",
        "Build side projects to reinforce learning",
        "Study system design patterns",
        "Read technical blogs and documentation",
      ],
      communication: [
        "Practice explaining concepts aloud",
        "Record yourself answering questions",
        "Use structured formats (STAR, PREP)",
        "Get feedback from peers",
        "Join speaking or presentation groups",
      ],
      confidence: [
        "Prepare and practice answers beforehand",
        "Use positive self-talk",
        "Focus on your strengths and achievements",
        "Practice with mock interviews",
        "Visualize success before the interview",
      ],
      structure: [
        "Use STAR format for behavioral questions",
        "Start with a summary, then provide details",
        "Use bullet points or numbered lists",
        "Practice the PREP framework (Point, Reason, Example, Point)",
        "Outline your answer before speaking",
      ],
      depth: [
        "Research each topic thoroughly",
        "Prepare multiple examples for each skill",
        "Practice follow-up questions",
        "Study advanced concepts in your field",
        "Be ready to go deeper when asked",
      ],
      examples: [
        "Prepare 3-5 strong examples from your experience",
        "Quantify results whenever possible",
        "Use the XYZ formula: I accomplished [X] by doing [Y] which resulted in [Z]",
        "Keep a record of your achievements",
        "Practice telling your success stories",
      ],
    };

    return strategies[category] || strategies.technical;
  },
};
