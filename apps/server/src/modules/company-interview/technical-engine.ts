import { z } from "zod";
import { aiService } from "@/services/ai";

const TECHNICAL_QUESTION_PROMPT = `You are a senior technical interviewer at {companyName}. Generate {count} {difficulty} level technical interview questions for a {role} position.

Topic: {topic}
Category: {category}
Question Types: {questionTypes}
Company Tech Stack: {techStack}
Experience Level: {experienceLevel}

Generate questions that are:
1. Specific to the company's tech stack and products
2. Practical and scenario-based when possible
3. Increasing in difficulty within the batch
4. Relevant to real-world problems at {companyName}

For each question, provide:
{
  "question": "string - the interview question",
  "type": "conceptual/scenario_based/debugging/architecture/optimization/tradeoffs/coding",
  "difficulty": "easy/medium/hard",
  "category": "string - specific topic area",
  "expectedTopics": ["string array of topics the answer should cover"],
  "followUpPotential": "string - potential follow-up question",
  "idealAnswerLength": "short/medium/long",
  "scoringCriteria": {
    "mustHave": ["string array of must-have points"],
    "niceToHave": ["string array of nice-to-have points"],
    "redFlags": ["string array of common mistakes"]
  }
}

Return ONLY a JSON array of objects, no other text.`;

const SCENARIO_PROMPT = `You are a senior technical interviewer at {companyName}. Create a technical scenario for a {role} interview.

Company: {companyName}
Tech Stack: {techStack}
Role: {role}
Topic: {topic}
Difficulty: {difficulty}

Create a realistic scenario that could happen at {companyName}. Provide:
{
  "scenario": "string - detailed scenario description",
  "context": "string - background information",
  "constraints": ["string array of constraints"],
  "questions": [
    {
      "question": "string",
      "type": "string",
      "difficulty": "string"
    }
  ],
  "expectedApproach": "string - how a good candidate should approach this",
  "evaluationPoints": ["string array of what to evaluate"]
}

Return ONLY valid JSON, no other text.`;

export const technicalQuestionEngine = {
  async generateQuestions(params: {
    companyName: string;
    role: string;
    topic: string;
    category: string;
    count: number;
    difficulty: string;
    techStack: string[];
    experienceLevel: string;
    questionTypes?: string[];
  }) {
    const prompt = TECHNICAL_QUESTION_PROMPT
      .replace(/{companyName}/g, params.companyName)
      .replace("{count}", String(params.count))
      .replace("{difficulty}", params.difficulty.toLowerCase())
      .replace("{role}", params.role)
      .replace("{topic}", params.topic)
      .replace("{category}", params.category)
      .replace("{questionTypes}", params.questionTypes?.join(", ") || "all")
      .replace("{techStack}", params.techStack.join(", "))
      .replace("{experienceLevel}", params.experienceLevel);

    try {
      const response = await aiService.generateJSON(prompt);
      const questions = typeof response === "string" ? JSON.parse(response) : response;
      return Array.isArray(questions) ? questions : questions.questions || [];
    } catch (error) {
      console.error("Technical question generation failed:", error);
      throw new Error("Failed to generate technical questions.");
    }
  },

  async generateScenario(params: {
    companyName: string;
    role: string;
    topic: string;
    techStack: string[];
    difficulty: string;
  }) {
    const prompt = SCENARIO_PROMPT
      .replace(/{companyName}/g, params.companyName)
      .replace("{role}", params.role)
      .replace("{topic}", params.topic)
      .replace("{techStack}", params.techStack.join(", "))
      .replace("{difficulty}", params.difficulty);

    try {
      const response = await aiService.generateJSON(prompt);
      return typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("Scenario generation failed:", error);
      throw new Error("Failed to generate scenario.");
    }
  },

  async evaluateAnswer(params: {
    question: string;
    answer: string;
    questionType: string;
    scoringCriteria: any;
    difficulty: string;
  }) {
    const EVALUATION_PROMPT = `You are a senior technical interviewer at a top tech company. Evaluate this technical interview answer.

Question: ${params.question}
Answer: ${params.answer}
Question Type: ${params.questionType}
Difficulty: ${params.difficulty}
Scoring Criteria: ${JSON.stringify(params.scoringCriteria)}

Provide a detailed evaluation in JSON format:
{
  "technicalScore": number (0-100),
  "communicationScore": number (0-100),
  "problemSolvingScore": number (0-100),
  "confidenceScore": number (0-100),
  "overallScore": number (0-100),
  "feedback": "string - 2-3 sentences of constructive feedback",
  "strengths": ["string array of specific strengths"],
  "improvements": ["string array of areas for improvement"],
  "idealAnswer": "string - what an ideal answer would look like",
  "improvedAnswer": "string - improved version of the candidate's answer",
  "followUpSuggestion": "string - a good follow-up question based on the answer",
  "interviewerPerception": "string - how the interviewer would perceive this answer",
  "didAnswerQuestion": boolean,
  "coveredExpectedTopics": ["string array of topics that were covered"],
  "missedTopics": ["string array of topics that were missed"]
}

Return ONLY valid JSON, no other text.`;

    try {
      const response = await aiService.generateJSON(EVALUATION_PROMPT);
      return typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("Technical evaluation failed:", error);
      throw new Error("Failed to evaluate answer.");
    }
  },

  getTopicQuestions(topic: string, difficulty: string): string[] {
    const questions: Record<string, Record<string, string[]>> = {
      react: {
        easy: [
          "What is the Virtual DOM and how does it work?",
          "Explain the difference between state and props.",
          "What are React hooks? Name a few.",
          "How does JSX differ from HTML?",
        ],
        medium: [
          "Explain the React lifecycle methods.",
          "How does React handle reconciliation?",
          "What is the difference between useMemo and useCallback?",
          "Explain controlled vs uncontrolled components.",
        ],
        hard: [
          "How would you optimize a large React dashboard?",
          "Explain React Fiber architecture.",
          "How would you implement server-side rendering?",
          "Design a custom hook for infinite scrolling.",
        ],
      },
      backend: {
        easy: [
          "What is REST and what are its principles?",
          "Explain the difference between SQL and NoSQL.",
          "What is middleware in Express.js?",
          "How does HTTP authentication work?",
        ],
        medium: [
          "How would you design a rate limiter?",
          "Explain database indexing and when to use it.",
          "What is the difference between PUT and PATCH?",
          "How does Redis improve API performance?",
        ],
        hard: [
          "Design a scalable microservices architecture.",
          "How would you handle distributed transactions?",
          "Explain event-driven architecture.",
          "How would you implement a message queue?",
        ],
      },
      machine_learning: {
        easy: [
          "What is overfitting and how do you prevent it?",
          "Explain the bias-variance tradeoff.",
          "What is cross-validation?",
          "Difference between supervised and unsupervised learning.",
        ],
        medium: [
          "Why would you choose Random Forest over Gradient Boosting?",
          "How do you handle class imbalance?",
          "Explain feature engineering techniques.",
          "What is regularization and why is it important?",
        ],
        hard: [
          "Design an end-to-end ML pipeline for production.",
          "How would you handle concept drift?",
          "Explain attention mechanisms in detail.",
          "How would you optimize model inference latency?",
        ],
      },
    };

    const topicLower = topic.toLowerCase();
    for (const [key, difficulties] of Object.entries(questions)) {
      if (topicLower.includes(key) || key.includes(topicLower)) {
        return difficulties[difficulty.toLowerCase() as keyof typeof difficulties] || difficulties.medium;
      }
    }

    return [
      "Tell me about your experience with this technology.",
      "What are the key concepts you should know?",
      "How would you apply this in a real project?",
      "What are common pitfalls to avoid?",
    ];
  },
};
