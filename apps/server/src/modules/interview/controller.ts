import type { Request, Response } from "express";
import { interviewService } from "./service";

function paramId(req: Request): string {
  const id = req.params.id;
  return Array.isArray(id) ? id[0] : id;
}

export const interviewController = {
  async start(req: Request, res: Response) {
    try {
      const interview = await interviewService.create(req.user!.userId, req.body);
      res.status(201).json({ success: true, interviewId: interview.id });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const interview = await interviewService.getById(paramId(req));
      if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });
      res.json({ success: true, interview });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getMyInterviews(req: Request, res: Response) {
    try {
      const interviews = await interviewService.getByUser(req.user!.userId);
      res.json({ success: true, interviews });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async submitAnswer(req: Request, res: Response) {
    try {
      const { questionId, answerText, audioUrl, videoUrl } = req.body;
      const answer = await interviewService.submitAnswer(questionId, { answerText, audioUrl, videoUrl });
      res.json({ success: true, saved: true, answerId: answer.id });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async end(req: Request, res: Response) {
    try {
      const interview = await interviewService.complete(paramId(req));
      res.json({ success: true, reportId: interview.id });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getReport(req: Request, res: Response) {
    try {
      const report = await interviewService.getReport(paramId(req));
      if (!report) return res.status(404).json({ success: false, message: "Report not found" });
      res.json({ success: true, report });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
