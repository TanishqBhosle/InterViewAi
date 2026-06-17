import { z } from "zod";
import { prisma } from "@/config/database";
import { companyAnalysisService } from "./company-analysis";
import { roleAnalysisService } from "./role-analysis";

const createBlueprintSchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  experienceLevel: z.string().min(1),
  jobDescription: z.string().optional(),
  resumeData: z.any().optional(),
});

export const blueprintService = {
  async generate(data: z.infer<typeof createBlueprintSchema>) {
    const validated = createBlueprintSchema.parse(data);

    // Get or create company profile
    const company = await companyAnalysisService.analyze({
      companyName: validated.companyName,
      role: validated.role,
      jobDescription: validated.jobDescription,
    });

    // Analyze role requirements
    const roleAnalysis = await roleAnalysisService.analyze({
      role: validated.role,
      experienceLevel: validated.experienceLevel,
      companyName: validated.companyName,
      industry: company.industry,
      jobDescription: validated.jobDescription,
      resumeSkills: validated.resumeData?.skills || [],
    });

    // Get role weightings
    const topicWeightings = await roleAnalysisService.getRoleWeightings(
      validated.role,
      validated.experienceLevel
    );

    // Determine question difficulty
    const difficulty = roleAnalysisService.getDifficultyForExperience(validated.experienceLevel);

    // Create question categories based on role and company
    const questionCategories = this.generateCategories(roleAnalysis, company, topicWeightings);

    // Generate behavioral focus based on company culture
    const behavioralFocus = this.generateBehavioralFocus(company, validated.experienceLevel);

    // Generate system design scope based on experience
    const systemDesignScope = this.generateSystemDesignScope(validated.experienceLevel);

    // Create or update blueprint
    const blueprint = await prisma.interviewBlueprint.upsert({
      where: {
        companyId_role_experienceLevel: {
          companyId: company.id,
          role: validated.role,
          experienceLevel: validated.experienceLevel,
        },
      },
      update: {
        jobDescription: validated.jobDescription ? { text: validated.jobDescription } : {},
        requiredSkills: roleAnalysis.requiredSkills || [],
        expectedKnowledge: roleAnalysis.expectedKnowledge || [],
        topicWeightings,
        questionDifficulty: difficulty,
        questionCategories,
        behavioralFocus,
        systemDesignScope,
        totalQuestions: this.calculateTotalQuestions(topicWeightings),
      },
      create: {
        companyId: company.id,
        role: validated.role,
        experienceLevel: validated.experienceLevel,
        jobDescription: validated.jobDescription ? { text: validated.jobDescription } : {},
        requiredSkills: roleAnalysis.requiredSkills || [],
        expectedKnowledge: roleAnalysis.expectedKnowledge || [],
        topicWeightings,
        questionDifficulty: difficulty,
        questionCategories,
        behavioralFocus,
        systemDesignScope,
        totalQuestions: this.calculateTotalQuestions(topicWeightings),
      },
    });

    return {
      blueprint,
      company,
      roleAnalysis,
      topicWeightings,
      difficulty,
    };
  },

  generateCategories(roleAnalysis: any, company: any, weightings: Record<string, number>) {
    const categories = [];

    // Technical categories based on role
    for (const [topic, weight] of Object.entries(weightings)) {
      if (weight >= 10) {
        categories.push({
          name: topic,
          weight,
          questionCount: Math.max(1, Math.round((weight / 100) * 15)),
          difficulty: weight >= 25 ? "HARD" : weight >= 15 ? "MEDIUM" : "EASY",
        });
      }
    }

    // Add behavioral category
    categories.push({
      name: "behavioral",
      weight: 15,
      questionCount: 3,
      difficulty: "MEDIUM",
    });

    return categories;
  },

  generateBehavioralFocus(company: any, experienceLevel: string) {
    const culture = company.culture as any;
    const values = company.values as string[] || [];

    const baseFocus = {
      leadership: experienceLevel.includes("SENIOR") || experienceLevel.includes("STAFF"),
      teamwork: true,
      conflictResolution: true,
      problemSolving: true,
      adaptability: true,
      ownership: true,
    };

    // Add company-specific focus
    if (values.includes("innovation") || values.includes("creativity")) {
      (baseFocus as any).innovation = true;
    }
    if (values.includes("customerObsession") || values.includes("customer-first")) {
      (baseFocus as any).customerFocus = true;
    }
    if (values.includes("biasForAction") || values.includes("action-oriented")) {
      (baseFocus as any).decisiveness = true;
    }

    return baseFocus;
  },

  generateSystemDesignScope(experienceLevel: string) {
    if (experienceLevel.includes("FRESHER") || experienceLevel.includes("JUNIOR")) {
      return {
        included: false,
        topics: [],
        complexity: "none",
      };
    }

    if (experienceLevel.includes("MID")) {
      return {
        included: true,
        topics: ["url_shortener", "rate_limiter", "chat_system"],
        complexity: "moderate",
        timeLimit: 30,
      };
    }

    return {
      included: true,
      topics: ["distributed_system", "social_media", "e_commerce", "search_engine"],
      complexity: "high",
      timeLimit: 45,
    };
  },

  calculateTotalQuestions(weightings: Record<string, number>): number {
    const totalWeight = Object.values(weightings).reduce((a, b) => a + b, 0);
    return Math.max(10, Math.min(20, Math.round(totalWeight / 5)));
  },

  async getByCompanyAndRole(companyId: string, role: string, experienceLevel: string) {
    return prisma.interviewBlueprint.findFirst({
      where: {
        companyId,
        role,
        experienceLevel,
      },
    });
  },

  async getById(id: string) {
    return prisma.interviewBlueprint.findUnique({
      where: { id },
      include: { company: true },
    });
  },
};
