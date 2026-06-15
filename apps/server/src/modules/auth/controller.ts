import type { Request, Response } from "express";
import { authService } from "./service";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ success: false, message: "Refresh token required" });
      }
      const result = await authService.refresh(refreshToken);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  },

  async sendOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await authService.sendOtp(email);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      const result = await authService.verifyOtp(email, code);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const user = await authService.getProfile(req.user!.userId);
      res.json({ success: true, user });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },
};
