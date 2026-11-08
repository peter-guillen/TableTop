import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import User from "../users/user.model.js";

// Real routes and real cookie settings. Only User.findOne is replaced so the
// login test doesn't need a database.
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("auth cookie in production", () => {
  it("login sets a first-party cookie: HttpOnly, Secure, SameSite=Lax", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(User, "findOne").mockResolvedValue({
      _id: "6a580c1ec136c681a00e62c5",
      username: "demo",
      email: "demo@rpg.com",
      role: "user",
      comparePassword: async () => true,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "demo@rpg.com", password: "demo" });

    expect(res.status).toBe(200);
    const cookie = res.headers["set-cookie"]?.[0] ?? "";
    expect(cookie).toMatch(/^token=/);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).not.toContain("SameSite=None");
  });

  it("logout clears the cookie with the same settings it was set with", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
    const cookie = res.headers["set-cookie"]?.[0] ?? "";
    expect(cookie).toMatch(/^token=;/);
    expect(cookie).toContain("Expires=Thu, 01 Jan 1970");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Lax");
  });
});
