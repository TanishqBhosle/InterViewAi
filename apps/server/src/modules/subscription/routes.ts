import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();
router.use(authenticate);

router.get("/", async (req, res) => {
  try {
    const sub = await prisma.subscription.findFirst({ where: { userId: req.user!.userId }, orderBy: { createdAt: "desc" } });
    res.json({ success: true, subscription: sub });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { plan } = req.body;
    const prices: Record<string, number> = { pro: 29900, premium: 99900 };
    const amount = prices[plan];
    if (!amount) return res.status(400).json({ success: false, message: "Invalid plan" });
    // Razorpay integration placeholder
    res.json({ success: true, amount, currency: "INR", orderId: "order_" + Date.now() });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, plan } = req.body;
    await prisma.subscription.create({
      data: {
        userId: req.user!.userId,
        plan: plan.toUpperCase(),
        status: "ACTIVE",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        razorpaySubId: razorpayOrderId,
      },
    });
    await prisma.payment.create({
      data: { userId: req.user!.userId, amount: 0, status: "SUCCESS", razorpayOrderId, razorpayPaymentId },
    });
    res.json({ success: true, message: "Subscription activated" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
