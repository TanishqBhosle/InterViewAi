import { Router } from "express";
import { prisma } from "@/config/database";

const router = Router();

router.get("/resources", async (req, res) => {
  try {
    const { category, company, difficulty } = req.query;
    const where: any = {};
    if (category) where.category = category;
    if (company) where.company = company;
    if (difficulty) where.difficulty = difficulty;
    const resources = await prisma.learningResource.findMany({ where, orderBy: { viewCount: "desc" } });
    res.json({ success: true, resources });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/resources/:id", async (req, res) => {
  try {
    const resource = await prisma.learningResource.findUnique({ where: { id: req.params.id } });
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    await prisma.learningResource.update({ where: { id: req.params.id }, data: { viewCount: { increment: 1 } } });
    res.json({ success: true, resource });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
