import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();
router.use(authenticate);

router.get("/", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json({ success: true, notifications });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id/read", async (req, res) => {
  try {
    await prisma.notification.update({ where: { id: req.params.id }, data: { isRead: true } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
