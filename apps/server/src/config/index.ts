import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    console.warn(`[WARN] Environment variable ${name} is not set, using development fallback`);
  }
  return value || "";
}

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",

  jwt: {
    secret: requireEnv("JWT_SECRET") || "dev-jwt-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshSecret: requireEnv("JWT_REFRESH_SECRET") || "dev-refresh-secret",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  database: {
    url: requireEnv("DATABASE_URL") || "postgresql://postgres:postgres@localhost:5432/interviewai",
  },

  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },


  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    region: process.env.AWS_REGION || "ap-south-1",
    s3Bucket: process.env.AWS_S3_BUCKET || "interviewai-uploads",
  },

  grok: {
    apiKey: process.env.GROK_API_KEY || "",
    baseUrl: process.env.GROK_BASE_URL || "https://api.x.ai/v1",
    model: process.env.GROK_MODEL || "grok-2-latest",
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  },
};
