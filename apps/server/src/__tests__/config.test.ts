import { describe, it, expect } from "vitest";

describe("Config", () => {
  it("should have config loaded from env", async () => {
    const { config } = await import("@/config");
    expect(config).toBeDefined();
    expect(config.port).toBe(4000);
    expect(config.nodeEnv).toBeDefined();
    expect(config.jwt).toBeDefined();
    expect(config.jwt.secret).toBeTruthy();
    expect(config.jwt.refreshSecret).toBeTruthy();
  });

  it("should have required config structure", async () => {
    const { config } = await import("@/config");
    expect(config).toHaveProperty("port");
    expect(config).toHaveProperty("nodeEnv");
    expect(config).toHaveProperty("corsOrigin");
    expect(config).toHaveProperty("jwt");
    expect(config.jwt).toHaveProperty("secret");
    expect(config.jwt).toHaveProperty("refreshSecret");
    expect(config).toHaveProperty("database");
    expect(config.database).toHaveProperty("url");
    expect(config).toHaveProperty("rateLimit");
    expect(config.rateLimit).toHaveProperty("windowMs");
    expect(config.rateLimit).toHaveProperty("max");
  });
});
