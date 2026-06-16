import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";

const router = Router();
router.use(authenticate);

async function requireSessionOwnership(req: any, res: any, next: any) {
  const sessionId = req.params.id;
  if (!sessionId) return res.status(400).json({ success: false, message: "Session ID required" });
  const session = await prisma.chatSession.findFirst({ where: { id: sessionId, userId: req.user!.userId } });
  if (!session) return res.status(404).json({ success: false, message: "Session not found" });
  next();
}

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

router.get("/sessions/:id/messages", requireSessionOwnership, async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({ where: { sessionId: req.params.id }, orderBy: { createdAt: "asc" } });
    res.json({ success: true, messages });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/sessions/:id/messages", requireSessionOwnership, async (req, res) => {
  try {
    const { role, content } = req.body;
    if (!["user", "assistant"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    if (!content || typeof content !== "string") {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    // Save user message
    const message = await prisma.chatMessage.create({ data: { sessionId: req.params.id, role, content } });
    await prisma.chatSession.update({ where: { id: req.params.id }, data: { updatedAt: new Date() } });

    // Generate AI coach response
    const session = await prisma.chatSession.findUnique({ where: { id: req.params.id } });
    const aiResponse = await aiService.getCoachResponse(session?.context || "", content);

    // Save AI response
    const aiMessage = await prisma.chatMessage.create({
      data: { sessionId: req.params.id, role: "assistant", content: aiResponse },
    });
    await prisma.chatSession.update({ where: { id: req.params.id }, data: { updatedAt: new Date() } });

    res.json({ success: true, userMessage: message, aiMessage });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
