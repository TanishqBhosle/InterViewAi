import OpenAI from "openai";
import { config } from "@/config";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    if (!config.grok.apiKey) {
      throw new Error("Grok API key not configured");
    }
    client = new OpenAI({ apiKey: config.grok.apiKey, baseURL: config.grok.baseUrl });
  }
  return client;
}

const QUESTION_GENERATION_PROMPT = `You are an expert interview question generator for the Indian job market.
Generate {count} {difficulty} level {type} interview questions for a {role} position.
The questions should be specific, practical, and commonly asked in Indian tech companies.
Return ONLY a JSON array of strings, no other text or formatting.`;

const EVALUATION_PROMPT = `You are an expert interview evaluator. Evaluate the candidate's answer to the following interview question.

Question: {question}
Answer: {answer}

Score each category from 0-100:
- technicalScore: Technical accuracy and depth
- communicationScore: Clarity, structure, and articulation
- confidenceScore: Confidence and conviction
- problemSolvingScore: Analytical thinking and approach

Also provide:
- overallScore: Weighted average
- feedback: 2-3 sentence constructive feedback
- strengths: Array of 1-2 specific strengths
- improvements: Array of 1-2 specific areas for improvement

Return ONLY valid JSON with these exact keys: technicalScore, communicationScore, confidenceScore, problemSolvingScore, overallScore, feedback, strengths, improvements`;

const COACH_PROMPT = `You are an expert AI career coach for InterviewAI India, a platform helping Indian professionals prepare for interviews and career growth.

Context: {context}

User message: {message}

Provide a helpful, specific, and actionable response. Be encouraging but honest. 
Consider the Indian job market context. Format with clear sections using markdown.
Keep responses under 300 words.`;

export const aiService = {
  async generateQuestions(params: {
    type: string;
    difficulty: string;
    role: string;
    count: number;
  }): Promise<string[]> {
    const prompt = QUESTION_GENERATION_PROMPT
      .replace("{count}", String(params.count))
      .replace("{difficulty}", params.difficulty.toLowerCase())
      .replace("{type}", params.type.replace("_", " "))
      .replace("{role}", params.role);

    try {
      const openai = getClient();
      const response = await openai.chat.completions.create({
        model: config.grok.model,
        messages: [
          { role: "system", content: "You are a helpful assistant that outputs only valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      const parsed = JSON.parse(content);
      const questions = parsed.questions || parsed;
      if (!Array.isArray(questions)) throw new Error("Invalid response format");

      return questions.slice(0, params.count);
    } catch (err) {
      console.error("AI question generation failed:", err);
      throw new Error("Failed to generate questions. Please try again.");
    }
  },

  async evaluateAnswer(question: string, answer: string): Promise<{
    technicalScore: number;
    communicationScore: number;
    confidenceScore: number;
    problemSolvingScore: number;
    overallScore: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  }> {
    const prompt = EVALUATION_PROMPT
      .replace("{question}", question)
      .replace("{answer}", answer);

    try {
      const openai = getClient();
      const response = await openai.chat.completions.create({
        model: config.grok.model,
        messages: [
          { role: "system", content: "You are an expert interview evaluator. Return only valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No evaluation from AI");

      return JSON.parse(content);
    } catch (err) {
      console.error("AI evaluation failed:", err);
      return {
        technicalScore: 0,
        communicationScore: 0,
        confidenceScore: 0,
        problemSolvingScore: 0,
        overallScore: 0,
        feedback: "Evaluation temporarily unavailable. Please try again.",
        strengths: [],
        improvements: [],
      };
    }
  },

  async generateJSON(prompt: string): Promise<any> {
    try {
      const openai = getClient();
      const response = await openai.chat.completions.create({
        model: config.grok.model,
        messages: [
          { role: "system", content: "You are a helpful assistant that outputs only valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      return JSON.parse(content);
    } catch (err) {
      console.error("AI JSON generation failed:", err);
      throw new Error("Failed to generate JSON response. Please try again.");
    }
  },

  async generateText(prompt: string): Promise<string> {
    try {
      const openai = getClient();
      const response = await openai.chat.completions.create({
        model: config.grok.model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      return response.choices[0]?.message?.content || "No response generated.";
    } catch (err) {
      console.error("AI text generation failed:", err);
      throw new Error("Failed to generate text response. Please try again.");
    }
  },

  async getCoachResponse(context: string, message: string): Promise<string> {
    const prompt = COACH_PROMPT
      .replace("{context}", context || "General career guidance")
      .replace("{message}", message);

    try {
      const openai = getClient();
      const response = await openai.chat.completions.create({
        model: config.grok.model,
        messages: [
          { role: "system", content: "You are an expert AI career coach for Indian professionals." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";
    } catch (err) {
      console.error("AI coach response failed:", err);
      return "I'm experiencing a temporary issue. Please try again in a moment.";
    }
  },
};
