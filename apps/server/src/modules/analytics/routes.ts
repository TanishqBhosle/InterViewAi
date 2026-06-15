import { Router } from "express";
import { authenticate } from "@/middleware/auth";

const router = Router();

router.get("/stats", authenticate, async (req, res) => {
  try {
    // Placeholder - will integrate with proper analytics
    res.json({ success: true, stats: { interviews: 0, accuracy: 0, avgScore: 0 } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
