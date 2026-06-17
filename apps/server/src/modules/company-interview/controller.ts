import { Request, Response } from "express";
import { companyInterviewService } from "./service";
import { companyAnalysisService } from "./company-analysis";
import { blueprintService } from "./blueprint";
import { finalReportService } from "./final-report";
import { interviewReplayService } from "./interview-replay";
import { readinessScoreService } from "./readiness-score";
import { benchmarkingService } from "./benchmarking";

export const companyInterviewController = {
  // Start a new company-specific interview session
  async startSession(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const session = await companyInterviewService.startSession(userId, req.body);
      res.json({ success: true, ...session });
    } catch (error: any) {
      console.error("Start session error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Submit an answer to a question
  async submitAnswer(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const result = await companyInterviewService.submitAnswer(userId, req.body);
      res.json({ success: true, ...result });
    } catch (error: any) {
      console.error("Submit answer error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // End the interview and generate report
  async endSession(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const sessionId = req.params.sessionId as string;
      const report = await companyInterviewService.endSession(sessionId, userId);
      res.json({ success: true, ...report });
    } catch (error: any) {
      console.error("End session error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get session details
  async getSession(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const sessionId = req.params.sessionId as string;
      const session = await companyInterviewService.getSession(sessionId, userId);
      res.json({ success: true, session });
    } catch (error: any) {
      console.error("Get session error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get all sessions for a user
  async getSessions(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const sessions = await companyInterviewService.getSessionsByUser(userId);
      res.json({ success: true, sessions });
    } catch (error: any) {
      console.error("Get sessions error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Generate follow-up question
  async generateFollowUp(req: Request, res: Response) {
    try {
      const followUp = await companyInterviewService.generateFollowUp(req.body);
      res.json({ success: true, ...followUp });
    } catch (error: any) {
      console.error("Generate follow-up error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Analyze a company
  async analyzeCompany(req: Request, res: Response) {
    try {
      const analysis = await companyAnalysisService.analyze(req.body);
      res.json({ success: true, company: analysis });
    } catch (error: any) {
      console.error("Analyze company error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get all companies
  async getCompanies(req: Request, res: Response) {
    try {
      const companies = await companyAnalysisService.getAll();
      res.json({ success: true, companies });
    } catch (error: any) {
      console.error("Get companies error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Search companies
  async searchCompanies(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const companies = await companyAnalysisService.search(query as string);
      res.json({ success: true, companies });
    } catch (error: any) {
      console.error("Search companies error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get FAANG companies
  async getFAANGCompanies(req: Request, res: Response) {
    try {
      const companies = await companyAnalysisService.getFAANGCompanies();
      res.json({ success: true, companies });
    } catch (error: any) {
      console.error("Get FAANG companies error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Generate interview blueprint
  async generateBlueprint(req: Request, res: Response) {
    try {
      const blueprint = await blueprintService.generate(req.body);
      res.json({ success: true, ...blueprint });
    } catch (error: any) {
      console.error("Generate blueprint error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get report by ID
  async getReport(req: Request, res: Response) {
    try {
      const reportId = req.params.reportId as string;
      const report = await finalReportService.getReport(reportId);
      res.json({ success: true, report });
    } catch (error: any) {
      console.error("Get report error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get all reports for a user
  async getReports(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const reports = await finalReportService.getReportsByUser(userId);
      res.json({ success: true, reports });
    } catch (error: any) {
      console.error("Get reports error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get interview replay
  async getReplay(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId as string;
      const replay = await interviewReplayService.getReplay(sessionId);
      res.json({ success: true, replay });
    } catch (error: any) {
      console.error("Get replay error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get readiness scores
  async getReadiness(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId as string;
      const readiness = await readinessScoreService.calculate(sessionId);
      res.json({ success: true, readiness });
    } catch (error: any) {
      console.error("Get readiness error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get benchmarking data
  async getBenchmark(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      const role = req.params.role as string;
      const { score } = req.query;
      const benchmark = await benchmarkingService.compare(
        companyId,
        role,
        Number(score) || 0
      );
      res.json({ success: true, benchmark });
    } catch (error: any) {
      console.error("Get benchmark error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Get company benchmarks
  async getCompanyBenchmarks(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      const benchmarks = await benchmarkingService.getCompanyBenchmarks(companyId);
      res.json({ success: true, benchmarks });
    } catch (error: any) {
      console.error("Get company benchmarks error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
