import { Router } from "express";
import { interviewController } from "./controller";
import { authenticate } from "@/middleware/auth";

const router = Router();

router.use(authenticate);
router.post("/start", interviewController.start);
router.get("/", interviewController.getMyInterviews);
router.get("/:id", interviewController.getById);
router.post("/answer", interviewController.submitAnswer);
router.post("/:id/end", interviewController.end);
router.get("/report/:id", interviewController.getReport);

export default router;
