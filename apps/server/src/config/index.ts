import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",

  jwt: {
    secret: process.env.JWT_SECRET || "super-secret-key-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret-key-change",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  database: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/interviewai",
  },

  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    region: process.env.AWS_REGION || "ap-south-1",
    s3Bucket: process.env.AWS_S3_BUCKET || "interviewai-uploads",
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_MODEL || "gpt-4",
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  },
};
