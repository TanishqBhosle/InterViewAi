import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { requireOwnership } from "@/middleware/ownership";

vi.mock("@/config/database", () => ({
  prisma: {
    resume: { findUnique: vi.fn() },
    interview: { findUnique: vi.fn() },
    notification: { findUnique: vi.fn() },
    chatSession: { findUnique: vi.fn() },
  },
}));

import { prisma } from "@/config/database";

function createMockReqRes(params: { id?: string; userId?: string }) {
  const req = {
    params: { id: params.id },
    user: params.userId ? { userId: params.userId, role: "STUDENT", email: "test@test.com" } : undefined,
  } as unknown as Request;

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;

  const next = vi.fn() as NextFunction;

  return { req, res, next };
}

describe("requireOwnership middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("resume ownership", () => {
    it("should pass when user owns the resume", async () => {
      const { req, res, next } = createMockReqRes({ id: "resume-1", userId: "user-1" });
      (prisma.resume.findUnique as any).mockResolvedValue({ userId: "user-1" });

      const middleware = requireOwnership("resume");
      await middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should reject when user does not own the resume", async () => {
      const { req, res, next } = createMockReqRes({ id: "resume-1", userId: "user-1" });
      (prisma.resume.findUnique as any).mockResolvedValue({ userId: "other-user" });

      const middleware = requireOwnership("resume");
      await middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 404 when resume not found", async () => {
      const { req, res, next } = createMockReqRes({ id: "nonexistent", userId: "user-1" });
      (prisma.resume.findUnique as any).mockResolvedValue(null);

      const middleware = requireOwnership("resume");
      await middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 when no ID provided", async () => {
      const { req, res, next } = createMockReqRes({ userId: "user-1" });

      const middleware = requireOwnership("resume");
      await middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("interview ownership", () => {
    it("should pass when user owns the interview", async () => {
      const { req, res, next } = createMockReqRes({ id: "interview-1", userId: "user-1" });
      (prisma.interview.findUnique as any).mockResolvedValue({ userId: "user-1" });

      const middleware = requireOwnership("interview");
      await middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should reject when user does not own the interview", async () => {
      const { req, res, next } = createMockReqRes({ id: "interview-1", userId: "user-1" });
      (prisma.interview.findUnique as any).mockResolvedValue({ userId: "other-user" });

      const middleware = requireOwnership("interview");
      await middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
    });
  });

  describe("notification ownership", () => {
    it("should pass when user owns the notification", async () => {
      const { req, res, next } = createMockReqRes({ id: "notif-1", userId: "user-1" });
      (prisma.notification.findUnique as any).mockResolvedValue({ userId: "user-1" });

      const middleware = requireOwnership("notification");
      await middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
