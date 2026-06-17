import { z } from "zod";
import { aiService } from "@/services/ai";

const ROLE_ANALYSIS_PROMPT = `You are a senior technical recruiter and hiring manager. Analyze the role requirements for interview preparation.

Role: {role}
Experience Level: {experienceLevel}
Company: {companyName}
Industry: {industry}
Job Description: {jobDescription}
Resume Skills: {resumeSkills}

Provide a detailed role analysis in JSON format:
{
  "role": "string",
  "experienceLevel": "string",
  "requiredSkills": [
    {
      "skill": "string",
      "importance": "critical/important/nice_to_have",
      "proficiencyLevel": "basic/intermediate/advanced/expert",
      "category": "technical/soft/domain"
    }
  ],
  "expectedKnowledge": [
    {
      "topic": "string",
      "depth": "surface/moderate/deep",
      "frequency": "always/often/sometimes"
    }
  ],
  "mostImportantTopics": ["string array of top 5 most critical topics"],
  "frequentlyAskedQuestions": ["string array of 10 most common questions for this role"],
  "technicalAssessment": {
    "codingRound": "boolean - if coding is expected",
    "systemDesign": "boolean - if system design is expected",
    "technicalDeepDive": "boolean - if deep technical questions expected",
    "codeReview": "boolean - if code review discussion expected"
  },
  "behavioralAreas": ["string array of behavioral competencies evaluated"],
  "projectQuestions": ["string array of project-based questions likely to be asked"],
  "salaryRange": {
    "min": "number",
    "max": "number",
    "currency": "string"
  },
  "growthPath": ["string array of career progression steps"],
  "dayToDay": ["string array of typical daily responsibilities"]
}

Return ONLY valid JSON, no other text.`;

export const roleAnalysisService = {
  async analyze(params: {
    role: string;
    experienceLevel: string;
    companyName: string;
    industry: string;
    jobDescription?: string;
    resumeSkills?: string[];
  }) {
    const prompt = ROLE_ANALYSIS_PROMPT
      .replace("{role}", params.role)
      .replace("{experienceLevel}", params.experienceLevel)
      .replace("{companyName}", params.companyName)
      .replace("{industry}", params.industry)
      .replace("{jobDescription}", params.jobDescription || "Not specified")
      .replace("{resumeSkills}", params.resumeSkills?.join(", ") || "Not provided");

    try {
      const response = await aiService.generateJSON(prompt);
      return typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("Role analysis failed:", error);
      throw new Error("Failed to analyze role. Please try again.");
    }
  },

  async getRoleWeightings(role: string, experienceLevel: string): Promise<Record<string, number>> {
    const roleLower = role.toLowerCase();

    // Default weightings based on role type
    const baseWeightings: Record<string, Record<string, number>> = {
      "frontend developer": {
        react: 30, javascript: 20, css: 10, system_design: 10,
        performance: 10, testing: 10, behavioral: 10,
      },
      "backend developer": {
        api_design: 25, databases: 20, system_design: 15, security: 10,
        performance: 10, coding: 10, behavioral: 10,
      },
      "full stack developer": {
        frontend: 25, backend: 25, database: 15, system_design: 10,
        devops: 5, coding: 10, behavioral: 10,
      },
      "data scientist": {
        machine_learning: 35, statistics: 20, sql: 15, python: 15,
        genai: 10, behavioral: 5,
      },
      "ml engineer": {
        ml: 25, deep_learning: 20, llm: 20, rag: 15,
        python: 10, system_design: 5, behavioral: 5,
      },
      "ai engineer": {
        llm: 25, rag: 20, ml: 15, deep_learning: 15,
        python: 10, projects: 10, behavioral: 5,
      },
      "product manager": {
        product_thinking: 30, strategy: 20, analytics: 15, design: 10,
        technical: 10, behavioral: 15,
      },
      "devops engineer": {
        cloud: 25, ci_cd: 20, containers: 15, monitoring: 15,
        security: 10, coding: 5, behavioral: 10,
      },
      "cyber security engineer": {
        security: 30, networking: 20, compliance: 15, incident_response: 15,
        tools: 10, behavioral: 10,
      },
      "sde": {
        coding: 30, system_design: 25, problem_solving: 20, oops: 10,
        databases: 10, behavioral: 5,
      },
    };

    // Find matching role
    for (const [key, weights] of Object.entries(baseWeightings)) {
      if (roleLower.includes(key) || key.includes(roleLower)) {
        return weights;
      }
    }

    // Default for unknown roles
    return {
      technical: 40,
      problem_solving: 20,
      communication: 15,
      leadership: 10,
      behavioral: 15,
    };
  },

  getDifficultyForExperience(experienceLevel: string): string {
    const level = experienceLevel.toUpperCase();
    if (level.includes("FRESHER") || level.includes("0-1")) return "EASY";
    if (level.includes("JUNIOR") || level.includes("1-3")) return "MEDIUM";
    if (level.includes("MID") || level.includes("3-5")) return "MEDIUM";
    if (level.includes("SENIOR") || level.includes("5-8")) return "HARD";
    if (level.includes("STAFF") || level.includes("8+")) return "EXPERT";
    if (level.includes("PRINCIPAL") || level.includes("10+")) return "EXPERT";
    return "MEDIUM";
  },
};
