import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();
router.use(authenticate);

router.post("/upload", async (req, res) => {
  try {
    const { fileName, fileUrl, fileSize, mimeType } = req.body;
    const resume = await prisma.resume.create({
      data: { userId: req.user!.userId, fileName, fileUrl, fileSize, mimeType },
    });
    res.status(201).json({ success: true, resumeId: resume.id, status: "uploaded" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({ where: { userId: req.user!.userId }, orderBy: { createdAt: "desc" } });
    res.json({ success: true, resumes });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    res.json({ success: true, resume });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.resume.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Resume deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
