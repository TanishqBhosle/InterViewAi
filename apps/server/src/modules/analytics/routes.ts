import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();

router.get("/stats", authenticate, async (req, res) => {
  try {
    const userId = req.user!.userId;

    const totalInterviews = await prisma.interview.count({ where: { userId } });
    const completedInterviews = await prisma.interview.count({ where: { userId, status: "COMPLETED" } });

    const reports = await prisma.report.findMany({
      where: { interview: { userId } },
      select: { overallScore: true, technicalScore: true, communicationScore: true, confidenceScore: true },
    });

    const avgScore = reports.length > 0
      ? Math.round(reports.reduce((s, r) => s + r.overallScore, 0) / reports.length)
      : 0;

    const totalDuration = await prisma.interview.aggregate({
      where: { userId, status: "COMPLETED" },
      _sum: { duration: true },
    });

    const latestResume = await prisma.resume.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { atsScore: true },
    });

    res.json({
      success: true,
      stats: {
        totalInterviews,
        completedInterviews,
        avgScore,
        atsScore: latestResume?.atsScore || 0,
        totalHours: Math.round((totalDuration._sum.duration || 0) / 3600),
        technicalScore: reports.length > 0 ? Math.round(reports.reduce((s, r) => s + r.technicalScore, 0) / reports.length) : 0,
        communicationScore: reports.length > 0 ? Math.round(reports.reduce((s, r) => s + r.communicationScore, 0) / reports.length) : 0,
        confidenceScore: reports.length > 0 ? Math.round(reports.reduce((s, r) => s + r.confidenceScore, 0) / reports.length) : 0,
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/interviews", authenticate, async (req, res) => {
  try {
    const interviews = await prisma.interview.findMany({
      where: { userId: req.user!.userId },
      include: { report: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json({ success: true, interviews });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/reports", authenticate, async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { interview: { userId: req.user!.userId } },
      include: { interview: { select: { type: true, role: true, createdAt: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, reports });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
