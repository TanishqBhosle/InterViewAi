import { Router } from "express";
import { authController } from "./controller";
import { authenticate } from "@/middleware/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.get("/me", authenticate, authController.me);

export default router;
