import { Router } from "express";
import { companyInterviewController } from "./controller";
import { authenticate } from "@/middleware/auth";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Session management
router.post("/start", companyInterviewController.startSession);
router.post("/answer", companyInterviewController.submitAnswer);
router.post("/:sessionId/end", companyInterviewController.endSession);
router.get("/:sessionId", companyInterviewController.getSession);
router.get("/", companyInterviewController.getSessions);

// Follow-up questions
router.post("/follow-up", companyInterviewController.generateFollowUp);

// Company analysis
router.post("/company/analyze", companyInterviewController.analyzeCompany);
router.get("/company/all", companyInterviewController.getCompanies);
router.get("/company/search", companyInterviewController.searchCompanies);
router.get("/company/faang", companyInterviewController.getFAANGCompanies);

// Blueprint generation
router.post("/blueprint/generate", companyInterviewController.generateBlueprint);

// Reports
router.get("/report/:reportId", companyInterviewController.getReport);
router.get("/reports/all", companyInterviewController.getReports);

// Interview replay
router.get("/replay/:sessionId", companyInterviewController.getReplay);

// Readiness scores
router.get("/readiness/:sessionId", companyInterviewController.getReadiness);

// Benchmarking
router.get("/benchmark/:companyId/:role", companyInterviewController.getBenchmark);
router.get("/benchmark/:companyId", companyInterviewController.getCompanyBenchmarks);

export default router;
