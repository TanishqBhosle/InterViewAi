import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";
import { z } from "zod";

const updateProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  targetRole: z.string().max(255).optional(),
  experience: z.number().int().min(0).max(100).optional(),
  currentCompany: z.string().max(255).optional(),
  currentRole: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
  education: z.array(z.object({}).passthrough()).optional(),
  careerGoals: z.array(z.string()).optional(),
  targetCompanies: z.array(z.string()).optional(),
});

const router = Router();
router.use(authenticate);

router.get("/me", async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { userId: req.user!.userId } });
    res.json({ success: true, profile });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/me", async (req, res) => {
  try {
    const validated = updateProfileSchema.parse(req.body);
    const profile = await prisma.profile.upsert({
      where: { userId: req.user!.userId },
      update: validated,
      create: { userId: req.user!.userId, ...validated },
    });
    res.json({ success: true, profile });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: err.errors });
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
