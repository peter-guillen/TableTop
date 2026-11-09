import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../app.js";
import User from "./user.model.js";
import RevokedToken from "../auth/revokedToken.model.js";

// These go through the real route and the real Mongoose validation. Only
// User.prototype.save is replaced where a test needs the database's answer.
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/users/register", () => {
  it("returns 400 instead of crashing when the body is empty", async () => {
    const res = await request(app).post("/api/users/register").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("username");
    expect(res.body.message).toContain("email");
    expect(res.body.message).toContain("password");
  });

  it("returns 400 when only some fields are sent", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ email: "someone@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("username");
    expect(res.body.message).toContain("password");
  });

  it("returns 400 when the email is already registered", async () => {
    vi.spyOn(User.prototype, "save").mockRejectedValue({ code: 11000 });

    const res = await request(app).post("/api/users/register").send({
      username: "someone",
      email: "someone@example.com",
      password: "a-password",
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "User already exists" });
  });

  it("returns 500 without exposing the error when the database fails", async () => {
    vi.spyOn(User.prototype, "save").mockRejectedValue(
      new Error("connection lost"),
    );

    const res = await request(app).post("/api/users/register").send({
      username: "someone",
      email: "someone@example.com",
      password: "a-password",
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Registration failed" });
  });

  it("returns 201 as a user, without the password, ignoring a role in the request", async () => {
    vi.spyOn(User.prototype, "save").mockResolvedValue();
    vi.stubEnv("JWT_SECRET", "test-secret");

    const res = await request(app).post("/api/users/register").send({
      username: "someone",
      email: "someone@example.com",
      password: "a-password",
      role: "admin",
    });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe("someone");
    expect(res.body.role).toBe("user");
    expect(res.body.password).toBeUndefined();
  });

  it("logs the new user in by setting the token cookie", async () => {
    vi.spyOn(User.prototype, "save").mockResolvedValue();
    vi.stubEnv("JWT_SECRET", "test-secret");

    const res = await request(app).post("/api/users/register").send({
      username: "someone",
      email: "someone@example.com",
      password: "a-password",
    });

    const cookie = res.headers["set-cookie"]?.[0] ?? "";
    expect(cookie).toMatch(/^token=/);
    expect(cookie).toContain("HttpOnly");

    const token = cookie.split(";")[0].replace("token=", "");
    const decoded = jwt.verify(token, "test-secret");
    expect(decoded._id).toBe(res.body._id);
    expect(decoded.role).toBe("user");
  });

  it("sets the same first-party cookie as login in production", async () => {
    vi.spyOn(User.prototype, "save").mockResolvedValue();
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.stubEnv("NODE_ENV", "production");

    const res = await request(app).post("/api/users/register").send({
      username: "someone",
      email: "someone@example.com",
      password: "a-password",
    });

    const cookie = res.headers["set-cookie"]?.[0] ?? "";
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Lax");
  });
});

describe("user admin routes: errors get a response instead of crashing", () => {
  it("GET /api/users returns 500 when the database fails", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "admin", tokenVersion: 0 }) }),
    });
    const token = jwt.sign({ _id: "6a580c1ec136c681a00e62c5", tv: 0 }, "test-secret", {
      jwtid: "t1",
    });
    vi.spyOn(User, "find").mockReturnValue({
      select: () => Promise.reject(new Error("connection lost")),
    });

    const res = await request(app)
      .get("/api/users")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to load users" });
  });

  it("DELETE /api/users/:id with a malformed id returns 404", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "admin", tokenVersion: 0 }) }),
    });
    const token = jwt.sign({ _id: "6a580c1ec136c681a00e62c5", tv: 0 }, "test-secret", {
      jwtid: "t1",
    });

    const res = await request(app)
      .delete("/api/users/not-an-id")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Invalid ID" });
  });

  it("DELETE /api/users/:id returns 404 (not 400) when the user doesn't exist", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "admin", tokenVersion: 0 }) }),
    });
    const token = jwt.sign({ _id: "6a580c1ec136c681a00e62c5", tv: 0 }, "test-secret", {
      jwtid: "t1",
    });
    vi.spyOn(User, "findByIdAndDelete").mockReturnValue({
      select: async () => null,
    });

    const res = await request(app)
      .delete("/api/users/6a580c1ec136c681a00e62c6")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "User Not Found!" });
  });
});
