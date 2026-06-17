import { z } from "zod";
import { aiService } from "@/services/ai";

const BEHAVIORAL_QUESTION_PROMPT = `You are a senior behavioral interviewer at {companyName}. Generate {count} behavioral interview questions.

Company: {companyName}
Company Values: {companyValues}
Role: {role}
Experience Level: {experienceLevel}
Focus Areas: {focusAreas}

Generate STAR-format behavioral questions that:
1. Align with {companyName}'s core values
2. Are relevant to the {role} position
3. Test specific competencies
4. Are appropriate for {experienceLevel} level

For each question, provide:
{
  "question": "string - behavioral question",
  "type": "STAR/leadership/conflict/failure/teamwork/adaptability/innovation/customer",
  "competency": "string - what competency this tests",
  "followUpQuestions": ["string array of potential follow-ups"],
  "evaluationCriteria": {
    "situation": "string - what to look for in situation description",
    "task": "string - what to look for in task explanation",
    "action": "string - what to look for in action description",
    "result": "string - what to look for in result description"
  },
  "redFlags": ["string array of warning signs"],
  "idealSignals": ["string array of positive indicators"]
}

Return ONLY a JSON array of objects, no other text.`;

const STAR_EVALUATION_PROMPT = `You are a senior behavioral interviewer. Evaluate this STAR-format answer.

Question: {question}
Answer: {answer}
Competency Being Tested: {competency}
Company Values: {companyValues}

Evaluate the answer using the STAR framework:
- Situation: Was it clear and relevant?
- Task: Was the responsibility clear?
- Action: Was it specific and demonstrate the competency?
- Result: Was it quantifiable and positive?

Provide evaluation in JSON format:
{
  "behavioralScore": number (0-100),
  "communicationScore": number (0-100),
  "leadershipScore": number (0-100),
  "overallScore": number (0-100),
  "starRating": {
    "situation": number (0-100),
    "task": number (0-100),
    "action": number (0-100),
    "result": number (0-100)
  },
  "feedback": "string - constructive feedback",
  "strengths": ["string array"],
  "improvements": ["string array"],
  "idealAnswer": "string - what an ideal answer would include",
  "improvedAnswer": "string - improved version of their answer",
  "interviewerPerception": "string - how interviewer would perceive this",
  "usedExamples": boolean,
  "demonstratedCompetency": boolean,
  "alignedWithValues": boolean
}

Return ONLY valid JSON, no other text.`;

export const behavioralQuestionEngine = {
  async generateQuestions(params: {
    companyName: string;
    role: string;
    experienceLevel: string;
    companyValues: string[];
    focusAreas: string[];
    count: number;
  }) {
    const prompt = BEHAVIORAL_QUESTION_PROMPT
      .replace(/{companyName}/g, params.companyName)
      .replace("{count}", String(params.count))
      .replace("{role}", params.role)
      .replace("{experienceLevel}", params.experienceLevel)
      .replace("{companyValues}", params.companyValues.join(", "))
      .replace("{focusAreas}", params.focusAreas.join(", "));

    try {
      const response = await aiService.generateJSON(prompt);
      const questions = typeof response === "string" ? JSON.parse(response) : response;
      return Array.isArray(questions) ? questions : questions.questions || [];
    } catch (error) {
      console.error("Behavioral question generation failed:", error);
      throw new Error("Failed to generate behavioral questions.");
    }
  },

  async evaluateAnswer(params: {
    question: string;
    answer: string;
    competency: string;
    companyValues: string[];
  }) {
    const prompt = STAR_EVALUATION_PROMPT
      .replace("{question}", params.question)
      .replace("{answer}", params.answer)
      .replace("{competency}", params.competency)
      .replace("{companyValues}", params.companyValues.join(", "));

    try {
      const response = await aiService.generateJSON(prompt);
      return typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("Behavioral evaluation failed:", error);
      throw new Error("Failed to evaluate behavioral answer.");
    }
  },

  getDefaultQuestions(): Array<{ question: string; type: string; competency: string }> {
    return [
      {
        question: "Tell me about a time when you had to lead a difficult project. What was your approach and what was the outcome?",
        type: "leadership",
        competency: "Leadership & Initiative",
      },
      {
        question: "Describe a situation where you had a conflict with a teammate. How did you resolve it?",
        type: "conflict",
        competency: "Conflict Resolution",
      },
      {
        question: "Tell me about a time you failed. What did you learn from it?",
        type: "failure",
        competency: "Growth Mindset",
      },
      {
        question: "Describe a project where you had to work under a tight deadline. How did you manage your time?",
        type: "STAR",
        competency: "Time Management",
      },
      {
        question: "Tell me about a time when you had to adapt to a significant change at work.",
        type: "adaptability",
        competency: "Adaptability",
      },
      {
        question: "Describe a situation where you went above and beyond for a customer or stakeholder.",
        type: "customer",
        competency: "Customer Focus",
      },
      {
        question: "Tell me about a time when you had to make a difficult decision without all the information.",
        type: "STAR",
        competency: "Decision Making",
      },
      {
        question: "Describe a time when you had to influence others without having direct authority.",
        type: "leadership",
        competency: "Influence & Persuasion",
      },
      {
        question: "Tell me about a creative solution you implemented for a complex problem.",
        type: "innovation",
        competency: "Innovation & Creativity",
      },
      {
        question: "Describe a situation where you had to give difficult feedback to someone.",
        type: "conflict",
        competency: "Communication & Feedback",
      },
    ];
  },

  getCompanySpecificQuestions(companyName: string): Array<{ question: string; type: string; competency: string }> {
    const company = companyName.toLowerCase();

    const faangQuestions: Record<string, Array<{ question: string; type: string; competency: string }>> = {
      google: [
        {
          question: "Tell me about a time when you had to use data to make a decision that wasn't popular.",
          type: "STAR",
          competency: "Data-Driven Decision Making",
        },
        {
          question: "Describe a situation where you had to work with ambiguous requirements.",
          type: "adaptability",
          competency: "Ambiguity Tolerance",
        },
      ],
      amazon: [
        {
          question: "Tell me about a time when you went above and beyond for a customer.",
          type: "customer",
          competency: "Customer Obsession",
        },
        {
          question: "Describe a situation where you had to dive deep into a problem.",
          type: "STAR",
          competency: "Ownership & Dive Deep",
        },
      ],
      meta: [
        {
          question: "Tell me about a time when you moved fast and broke things.",
          type: "STAR",
          competency: "Move Fast",
        },
        {
          question: "Describe a situation where you had to build community.",
          type: "teamwork",
          competency: "Build Community",
        },
      ],
      microsoft: [
        {
          question: "Tell me about a time when you had to help others succeed.",
          type: "teamwork",
          competency: "Help Others Succeed",
        },
        {
          question: "Describe a situation where you had to deliver results despite obstacles.",
          type: "STAR",
          competency: "Deliver Results",
        },
      ],
      apple: [
        {
          question: "Tell me about a time when you paid attention to the details that others missed.",
          type: "STAR",
          competency: "Attention to Detail",
        },
        {
          question: "Describe a situation where you had to simplify a complex problem.",
          type: "innovation",
          competency: "Simplicity & Innovation",
        },
      ],
    };

    for (const [key, questions] of Object.entries(faangQuestions)) {
      if (company.includes(key)) {
        return questions;
      }
    }

    return [];
  },
};
