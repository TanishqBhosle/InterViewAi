import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();
router.use(authenticate);

router.get("/sessions", async (req, res) => {
  try {
    const sessions = await prisma.chatSession.findMany({ where: { userId: req.user!.userId }, orderBy: { updatedAt: "desc" } });
    res.json({ success: true, sessions });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/sessions", async (req, res) => {
  try {
    const session = await prisma.chatSession.create({ data: { userId: req.user!.userId, title: req.body.title || "New Chat", context: req.body.context } });
    res.json({ success: true, session });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/sessions/:id/messages", async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({ where: { sessionId: req.params.id }, orderBy: { createdAt: "asc" } });
    res.json({ success: true, messages });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/sessions/:id/messages", async (req, res) => {
  try {
    const { role, content } = req.body;
    const message = await prisma.chatMessage.create({ data: { sessionId: req.params.id, role, content } });
    await prisma.chatSession.update({ where: { id: req.params.id }, data: { updatedAt: new Date() } });
    res.json({ success: true, message });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
