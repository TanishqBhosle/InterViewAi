import { describe, it, expect, vi, beforeEach } from "vitest";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

vi.mock("@/config/database", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    refreshToken: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    profile: {
      create: vi.fn(),
    },
    otpCode: {
      create: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock("@/config", () => ({
  config: {
    jwt: {
      secret: "test-secret",
      expiresIn: "15m",
      refreshSecret: "test-refresh-secret",
      refreshExpiresIn: "7d",
    },
  },
}));

import { authService } from "@/modules/auth/service";
import { prisma } from "@/config/database";

describe("Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("register", () => {
    const validInput = {
      name: "Test User",
      email: "test@example.com",
      password: "TestPass123!",
    };

    it("should register a new user successfully", async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        id: "user-1",
        name: validInput.name,
        email: validInput.email,
        role: "STUDENT",
      });
      (prisma.profile.create as any).mockResolvedValue({});
      (prisma.refreshToken.create as any).mockResolvedValue({});

      const result = await authService.register(validInput);

      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");
      expect(result.user.email).toBe(validInput.email);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: validInput.email },
      });
    });

    it("should reject duplicate email", async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: "existing" });

      await expect(authService.register(validInput)).rejects.toThrow(
        "Email already registered"
      );
    });

    it("should reject short password", async () => {
      const invalid = { ...validInput, password: "123" };
      await expect(authService.register(invalid)).rejects.toThrow();
    });

    it("should reject invalid email", async () => {
      const invalid = { ...validInput, email: "not-an-email" };
      await expect(authService.register(invalid)).rejects.toThrow();
    });
  });

  describe("login", () => {
    const validInput = {
      email: "test@example.com",
      password: "TestPass123!",
    };

    it("should login with valid credentials", async () => {
      const hashedPassword = await hash(validInput.password, 12);
      (prisma.user.findUnique as any).mockResolvedValue({
        id: "user-1",
        name: "Test User",
        email: validInput.email,
        role: "STUDENT",
        passwordHash: hashedPassword,
        isActive: true,
      });
      (prisma.user.update as any).mockResolvedValue({});
      (prisma.refreshToken.create as any).mockResolvedValue({});

      const result = await authService.login(validInput);

      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");
    });

    it("should reject invalid password", async () => {
      const hashedPassword = await hash("correct-password", 12);
      (prisma.user.findUnique as any).mockResolvedValue({
        id: "user-1",
        email: validInput.email,
        passwordHash: hashedPassword,
        role: "STUDENT",
      });

      await expect(
        authService.login({ ...validInput, password: "wrong-password" })
      ).rejects.toThrow("Invalid credentials");
    });

    it("should reject non-existent user", async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      await expect(authService.login(validInput)).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });

  describe("refresh token", () => {
    it("should refresh valid token", async () => {
      const now = new Date();
      const future = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      (prisma.refreshToken.findUnique as any).mockResolvedValue({
        id: "token-1",
        token: "valid-token",
        userId: "user-1",
        expiresAt: future,
        revokedAt: null,
        user: {
          id: "user-1",
          role: "STUDENT",
          email: "test@example.com",
        },
      });
      (prisma.refreshToken.update as any).mockResolvedValue({});
      (prisma.refreshToken.create as any).mockResolvedValue({});

      const result = await authService.refresh("valid-token");

      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");
    });

    it("should reject revoked token", async () => {
      (prisma.refreshToken.findUnique as any).mockResolvedValue({
        id: "token-1",
        token: "revoked-token",
        userId: "user-1",
        expiresAt: new Date(Date.now() + 86400000),
        revokedAt: new Date(),
      });

      await expect(authService.refresh("revoked-token")).rejects.toThrow(
        "Invalid refresh token"
      );
    });

    it("should reject expired token", async () => {
      (prisma.refreshToken.findUnique as any).mockResolvedValue({
        id: "token-1",
        token: "expired-token",
        userId: "user-1",
        expiresAt: new Date(Date.now() - 86400000),
        revokedAt: null,
      });

      await expect(authService.refresh("expired-token")).rejects.toThrow(
        "Invalid refresh token"
      );
    });
  });

  describe("OTP flow", () => {
    it("should send OTP", async () => {
      (prisma.otpCode.create as any).mockResolvedValue({});

      const result = await authService.sendOtp("test@example.com");

      expect(result.message).toBe("OTP sent successfully");
      expect(prisma.otpCode.create).toHaveBeenCalled();
    });

    it("should verify OTP and login", async () => {
      (prisma.otpCode.findFirst as any).mockResolvedValue({
        id: "otp-1",
        email: "test@example.com",
        code: "123456",
        used: false,
      });
      (prisma.otpCode.update as any).mockResolvedValue({});
      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        id: "new-user",
        name: "test",
        email: "test@example.com",
        role: "STUDENT",
      });
      (prisma.profile.create as any).mockResolvedValue({});

      const result = await authService.verifyOtp("test@example.com", "123456");

      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");
    });
  });
});
