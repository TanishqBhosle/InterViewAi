import { z } from "zod";
import { aiService } from "@/services/ai";

const APTITUDE_QUESTION_PROMPT = `You are an aptitude test designer for {companyName} interviews. Generate {count} {difficulty} level aptitude questions.

Company: {companyName}
Role: {role}
Question Types: {questionTypes}

Generate a mix of:
1. Quantitative Aptitude
2. Logical Reasoning
3. Puzzle Solving
4. Data Interpretation
5. Pattern Recognition

For each question, provide:
{
  "question": "string - the aptitude question",
  "type": "quantitative/logical/puzzle/data_interpretation/pattern",
  "difficulty": "easy/medium/hard",
  "options": ["string array of 4 options"],
  "correctAnswer": "string - correct option",
  "explanation": "string - step-by-step solution",
  "timeExpected": number - seconds expected to solve,
  "topic": "string - specific topic area"
}

Return ONLY a JSON array of objects, no other text.`;

export const aptitudeQuestionEngine = {
  async generateQuestions(params: {
    companyName: string;
    role: string;
    count: number;
    difficulty: string;
    questionTypes?: string[];
  }) {
    const prompt = APTITUDE_QUESTION_PROMPT
      .replace(/{companyName}/g, params.companyName)
      .replace("{count}", String(params.count))
      .replace("{difficulty}", params.difficulty.toLowerCase())
      .replace("{role}", params.role)
      .replace("{questionTypes}", params.questionTypes?.join(", ") || "all");

    try {
      const response = await aiService.generateJSON(prompt);
      const questions = typeof response === "string" ? JSON.parse(response) : response;
      return Array.isArray(questions) ? questions : questions.questions || [];
    } catch (error) {
      console.error("Aptitude question generation failed:", error);
      throw new Error("Failed to generate aptitude questions.");
    }
  },

  async evaluateAnswer(params: {
    question: string;
    answer: string;
    correctAnswer: string;
    explanation: string;
    timeTaken: number;
    expectedTime: number;
  }) {
    const isCorrect = params.answer.trim().toLowerCase() === params.correctAnswer.trim().toLowerCase();
    const timeEfficiency = Math.min(1, params.expectedTime / Math.max(params.timeTaken, 1));

    return {
      correct: isCorrect,
      score: isCorrect ? Math.round(60 + timeEfficiency * 40) : 0,
      timeEfficiency: Math.round(timeEfficiency * 100),
      feedback: isCorrect
        ? `Correct! ${timeEfficiency > 0.8 ? "Excellent speed!" : "Good job, but you could be faster."}`
        : `Incorrect. The correct answer is: ${params.correctAnswer}. ${params.explanation}`,
      explanation: params.explanation,
    };
  },

  getQuantitativeQuestions(difficulty: string): Array<{ question: string; options: string[]; answer: string }> {
    const questions = {
      easy: [
        {
          question: "If a train travels at 60 km/h for 2.5 hours, what is the distance covered?",
          options: ["120 km", "150 km", "180 km", "200 km"],
          answer: "150 km",
        },
        {
          question: "What is 15% of 200?",
          options: ["25", "30", "35", "40"],
          answer: "30",
        },
      ],
      medium: [
        {
          question: "A car travels 300 km in 5 hours. If it increases its speed by 20 km/h, how long will it take to travel 480 km?",
          options: ["5 hours", "6 hours", "7 hours", "8 hours"],
          answer: "6 hours",
        },
        {
          question: "If the ratio of A to B is 3:5 and B to C is 2:3, what is the ratio of A to C?",
          options: ["6:15", "3:15", "2:5", "6:10"],
          answer: "6:15",
        },
      ],
      hard: [
        {
          question: "A and B can complete a work in 12 days. B and C in 15 days. A and C in 20 days. How long will A, B, and C together take?",
          options: ["8 days", "10 days", "12 days", "15 days"],
          answer: "10 days",
        },
        {
          question: "What is the compound interest on Rs. 10,000 at 10% per annum for 3 years?",
          options: ["Rs. 3,000", "Rs. 3,310", "Rs. 3,331", "Rs. 3,100"],
          answer: "Rs. 3,310",
        },
      ],
    };

    return questions[difficulty as keyof typeof questions] || questions.medium;
  },

  getLogicalQuestions(difficulty: string): Array<{ question: string; options: string[]; answer: string }> {
    const questions = {
      easy: [
        {
          question: "If all roses are flowers and some flowers are red, which statement must be true?",
          options: [
            "All roses are red",
            "Some roses may be red",
            "No roses are red",
            "All red things are roses",
          ],
          answer: "Some roses may be red",
        },
      ],
      medium: [
        {
          question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
          options: ["40", "42", "44", "46"],
          answer: "42",
        },
      ],
      hard: [
        {
          question: "If DAY = 51 and NIGHT = 57, what is CITY?",
          options: ["64", "66", "68", "70"],
          answer: "66",
        },
      ],
    };

    return questions[difficulty as keyof typeof questions] || questions.medium;
  },

  getPuzzleQuestions(): Array<{ question: string; answer: string }> {
    return [
      {
        question: "You have two ropes. Each takes 1 hour to burn completely, but they burn at non-uniform rates. How do you measure exactly 45 minutes?",
        answer: "Light rope 1 from both ends and rope 2 from one end. When rope 1 burns out (30 min), light the other end of rope 2. When rope 2 burns out, 45 minutes have passed.",
      },
      {
        question: "You have 12 balls, one is heavier or lighter. Using a balance scale 3 times, how do you find the odd ball and determine if it's heavier or lighter?",
        answer: "Divide into 3 groups of 4. Weigh two groups. If equal, odd is in third group. Continue dividing and weighing to narrow down.",
      },
      {
        question: "Three people check into a hotel room that costs Rs. 30. They each pay Rs. 10. The manager realizes the room is Rs. 25 and sends Rs. 5 with the bellboy. The bellboy keeps Rs. 2 and gives Rs. 1 back to each person. Now each person paid Rs. 9 (total Rs. 27), the bellboy has Rs. 2. That's Rs. 29. Where's the missing Rs. 1?",
        answer: "There is no missing Rs. 1. The Rs. 27 includes the Rs. 2 the bellboy kept. Rs. 25 (hotel) + Rs. 2 (bellboy) = Rs. 27.",
      },
    ];
  },

  getDataInterpretationQuestions(): Array<{ question: string; data: any; options: string[]; answer: string }> {
    return [
      {
        question: "Based on the following sales data, which quarter had the highest growth rate?",
        data: {
          Q1: 100000,
          Q2: 120000,
          Q3: 115000,
          Q4: 150000,
        },
        options: ["Q1 to Q2", "Q2 to Q3", "Q3 to Q4", "Q1 to Q4"],
        answer: "Q3 to Q4",
      },
    ];
  },

  getPatternQuestions(): Array<{ question: string; options: string[]; answer: string }> {
    return [
      {
        question: "Complete the pattern: AZ, BY, CX, DW, ?",
        options: ["EV", "EU", "FV", "EX"],
        answer: "EV",
      },
      {
        question: "Find the missing number: 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "12", "13", "15"],
        answer: "13",
      },
    ];
  },
};
