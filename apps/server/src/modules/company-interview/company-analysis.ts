import { z } from "zod";
import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";

const analyzeCompanySchema = z.object({
  companyName: z.string().min(1),
  industry: z.string().optional(),
  role: z.string().min(1),
  jobDescription: z.string().optional(),
});

const COMPANY_ANALYSIS_PROMPT = `You are a senior HR analyst at {companyName}. Analyze the company comprehensively for interview preparation.

Company: {companyName}
Industry: {industry}
Target Role: {role}
Job Description: {jobDescription}

Provide a detailed analysis in JSON format with these exact keys:
{
  "companyName": "string",
  "industry": "string",
  "description": "string - brief company overview",
  "products": ["string array of main products/services"],
  "services": ["string array of services offered"],
  "techStack": ["string array of technologies used"],
  "culture": {
    "workStyle": "string - remote/hybrid/onsite, pace, etc",
    "values": ["string array of core values"],
    "teamStructure": "string - how teams are organized",
    "communicationStyle": "string - how people communicate"
  },
  "hiringProcess": {
    "stages": ["string array of hiring stages in order"],
    "typicalTimeline": "string - how long the process takes",
    "keyCriteria": ["string array of what they look for"],
    "commonQuestions": ["string array of frequently asked questions"]
  },
  "interviewProcess": {
    "rounds": "number of interview rounds",
    "format": "string - technical/case study/behavioral mix",
    "difficulty": "string - easy/medium/hard",
    "focusAreas": ["string array of main focus areas"]
  },
  "competitors": ["string array of main competitors"],
  "recentNews": ["string array of recent notable news/achievements"],
  "expectedSkills": ["string array of skills they value most"],
  "interviewTips": ["string array of company-specific interview tips"],
  "redFlags": ["string array of common rejection reasons"]
}

Return ONLY valid JSON, no other text.`;

export const companyAnalysisService = {
  async analyze(data: z.infer<typeof analyzeCompanySchema>) {
    const validated = analyzeCompanySchema.parse(data);

    // Check if company profile already exists
    const existing = await prisma.companyProfile.findUnique({
      where: { name: validated.companyName },
    });

    if (existing) {
      return existing;
    }

    // Generate analysis via AI
    const prompt = COMPANY_ANALYSIS_PROMPT
      .replace("{companyName}", validated.companyName)
      .replace("{industry}", validated.industry || "Technology")
      .replace("{role}", validated.role)
      .replace("{jobDescription}", validated.jobDescription || "Not specified");

    try {
      const response = await aiService.generateJSON(prompt);
      const analysis = typeof response === "string" ? JSON.parse(response) : response;

      // Save to database
      const companyProfile = await prisma.companyProfile.create({
        data: {
          name: validated.companyName,
          slug: validated.companyName.toLowerCase().replace(/\s+/g, "-"),
          industry: analysis.industry || validated.industry || "Technology",
          description: analysis.description,
          products: analysis.products || [],
          services: analysis.services || [],
          techStack: analysis.techStack || [],
          culture: analysis.culture || {},
          values: analysis.culture?.values || [],
          hiringProcess: analysis.hiringProcess || {},
          interviewProcess: analysis.interviewProcess || {},
          competitors: analysis.competitors || [],
          recentNews: analysis.recentNews || [],
          expectedSkills: analysis.expectedSkills || [],
          isFAANG: ["google", "amazon", "apple", "meta", "microsoft", "netflix"].includes(
            validated.companyName.toLowerCase()
          ),
        },
      });

      return companyProfile;
    } catch (error) {
      console.error("Company analysis failed:", error);
      throw new Error("Failed to analyze company. Please try again.");
    }
  },

  async getByName(name: string) {
    return prisma.companyProfile.findUnique({
      where: { name },
      include: { blueprints: true },
    });
  },

  async getAll() {
    return prisma.companyProfile.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  },

  async getFAANGCompanies() {
    return prisma.companyProfile.findMany({
      where: { isFAANG: true, isActive: true },
      orderBy: { name: "asc" },
    });
  },

  async update(id: string, data: Partial<z.infer<typeof analyzeCompanySchema>>) {
    return prisma.companyProfile.update({
      where: { id },
      data,
    });
  },

  async search(query: string) {
    return prisma.companyProfile.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { industry: { contains: query, mode: "insensitive" } },
        ],
        isActive: true,
      },
      take: 10,
    });
  },
};
