import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@/config/database";
import { config } from "@/config";
import type { AuthPayload } from "@/middleware/auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

function generateAccessToken(payload: AuthPayload): string {
  return sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn } as any);
}

function generateRefreshToken(payload: AuthPayload): string {
  return sign(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiresIn } as any);
}

export const authService = {
  async register(data: z.infer<typeof registerSchema>) {
    const validated = registerSchema.parse(data);

    const existing = await prisma.user.findUnique({ where: { email: validated.email } });
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await hash(validated.password, 12);
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        passwordHash: hashedPassword,
      },
    });

    await prisma.profile.create({ data: { userId: user.id } });

    const payload: AuthPayload = { userId: user.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  },

  async login(data: z.infer<typeof loginSchema>) {
    const validated = loginSchema.parse(data);

    const user = await prisma.user.findUnique({ where: { email: validated.email } });
    if (!user || !user.passwordHash) {
      throw new Error("Invalid credentials");
    }

    const valid = await compare(validated.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload: AuthPayload = { userId: user.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshTokenStr: string) {
    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshTokenStr },
      include: { user: true },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    const payload: AuthPayload = {
      userId: stored.user.id,
      role: stored.user.role,
      email: stored.user.email,
    };
    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: stored.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken: newRefreshToken };
  },

  async sendOtp(email: string) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    await prisma.otpCode.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    return { message: "OTP sent successfully" };
  },

  async verifyOtp(email: string, code: string) {
    const otp = await prisma.otpCode.findFirst({
      where: { email, code, used: false, expiresAt: { gt: new Date() } },
    });
    if (!otp) throw new Error("Invalid or expired OTP");

    await prisma.otpCode.update({
      where: { id: otp.id },
      data: { used: true },
    });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { name: email.split("@")[0], email, authProvider: "OTP" as any },
      });
      await prisma.profile.create({ data: { userId: user.id } });
    }

    const payload: AuthPayload = { userId: user.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
  },

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
      omit: { passwordHash: true },
    });
    if (!user) throw new Error("User not found");
    return user;
  },
};
