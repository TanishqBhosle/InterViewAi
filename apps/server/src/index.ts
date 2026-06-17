import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import authRoutes from "./modules/auth/routes";
import interviewRoutes from "./modules/interview/routes";
import companyInterviewRoutes from "./modules/company-interview/routes";
import resumeRoutes from "./modules/resume/routes";
import profileRoutes from "./modules/profile/routes";

import coachRoutes from "./modules/coach/routes";
import learningRoutes from "./modules/learning/routes";
import analyticsRoutes from "./modules/analytics/routes";
import notificationRoutes from "./modules/notification/routes";
import dsaRoutes from "./modules/dsa/routes";

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "InterviewAI India API is running", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/interviews", interviewRoutes);
app.use("/api/v1/company-interviews", companyInterviewRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/coach", coachRoutes);
app.use("/api/v1/learning", learningRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/dsa", dsaRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(config.port, () => {
  console.log(`[InterviewAI] Server running on port ${config.port} in ${config.nodeEnv} mode`);
});

export default app;
