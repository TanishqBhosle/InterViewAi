import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

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
    const profile = await prisma.profile.upsert({
      where: { userId: req.user!.userId },
      update: req.body,
      create: { userId: req.user!.userId, ...req.body },
    });
    res.json({ success: true, profile });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
