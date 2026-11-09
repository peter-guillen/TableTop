import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../app.js";
import User from "../users/user.model.js";
import RevokedToken from "./revokedToken.model.js";

// Real routes and real cookie settings. Only the database calls
// (User.findOne, RevokedToken.updateOne/exists) are replaced.
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

describe("logout revokes the session", () => {
  it("adds the token's id to the revoked list, expiring when the token would", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      expiresIn: "7d",
      jwtid: "id-1",
    });
    const { exp } = jwt.decode(token);
    const updateOne = vi
      .spyOn(RevokedToken, "updateOne")
      .mockResolvedValue({ acknowledged: true });

    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(updateOne).toHaveBeenCalledWith(
      { jti: "id-1" },
      { $setOnInsert: { expiresAt: new Date(exp * 1000) } },
      { upsert: true },
    );
    expect(res.headers["set-cookie"]?.[0]).toMatch(/^token=;/);
  });

  it("does not touch the database when there is no cookie", async () => {
    const updateOne = vi.spyOn(RevokedToken, "updateOne");

    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
    expect(updateOne).not.toHaveBeenCalled();
  });

  it("still clears the cookie when the token is already invalid", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    const updateOne = vi.spyOn(RevokedToken, "updateOne");

    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", "token=not-a-real-token");

    expect(res.status).toBe(200);
    expect(updateOne).not.toHaveBeenCalled();
    expect(res.headers["set-cookie"]?.[0]).toMatch(/^token=;/);
  });

  it("returns 500 but still clears the cookie when revoking fails", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "updateOne").mockRejectedValue(
      new Error("connection lost"),
    );

    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(500);
    expect(res.headers["set-cookie"]?.[0]).toMatch(/^token=;/);
  });

  it("full flow: a token copied before logout is refused afterwards", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(User, "findOne").mockResolvedValue({
      _id: "6a580c1ec136c681a00e62c5",
      username: "demo",
      email: "demo@rpg.com",
      role: "user",
      tokenVersion: 0,
      comparePassword: async () => true,
    });
    // Stand-in for the RevokedToken collection
    const revokedIds = [];
    vi.spyOn(RevokedToken, "updateOne").mockImplementation(async (filter) => {
      revokedIds.push(filter.jti);
      return { acknowledged: true };
    });
    vi.spyOn(RevokedToken, "exists").mockImplementation(async (filter) =>
      revokedIds.includes(filter.jti) ? { _id: "r1" } : null,
    );

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "demo@rpg.com", password: "demo" });
    const copiedToken = login.headers["set-cookie"][0]
      .split(";")[0]
      .replace("token=", "");

    await request(app)
      .post("/api/auth/logout")
      .set("Cookie", `token=${copiedToken}`);

    const afterLogout = await request(app)
      .get("/api/auth/me")
      .set("Cookie", `token=${copiedToken}`);

    expect(revokedIds).toEqual([jwt.decode(copiedToken).jti]);
    expect(afterLogout.status).toBe(401);
    expect(afterLogout.body).toEqual({
      message: "Unauthorized: Session has ended",
    });
  });
});
