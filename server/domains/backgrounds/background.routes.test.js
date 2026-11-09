import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../app.js";
import Background from "./background.model.js";
import User from "../users/user.model.js";
import RevokedToken from "../auth/revokedToken.model.js";

// Real routes and middleware. Only the model calls are replaced, so none of
// these need a database. Logged-in requests sign a real token with a test
// secret and fake the two lookups checkAuthenticated makes.
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("Background routes: errors get a response instead of crashing", () => {
  it("GET /api/backgrounds/:id with a malformed id returns 404 without querying", async () => {
    const findById = vi.spyOn(Background, "findById");

    const res = await request(app).get("/api/backgrounds/not-an-id");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Invalid ID" });
    expect(findById).not.toHaveBeenCalled();
  });

  it("GET /api/backgrounds returns 500 when the database fails", async () => {
    vi.spyOn(Background, "find").mockRejectedValue(new Error("connection lost"));

    const res = await request(app).get("/api/backgrounds");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to load backgrounds" });
  });

  it("GET /api/backgrounds/:id returns 404 when the record doesn't exist", async () => {
    vi.spyOn(Background, "findById").mockResolvedValue(null);

    const res = await request(app).get("/api/backgrounds/6a580c1ec136c681a00e62c5");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Background Not Found!" });
  });

  it("POST /api/backgrounds with invalid input returns 400 instead of hanging", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "editor", tokenVersion: 0 }) }),
    });
    const token = jwt.sign({ _id: "6a580c1ec136c681a00e62c5", tv: 0 }, "test-secret", {
      jwtid: "t1",
    });
    vi.spyOn(Background, "create").mockRejectedValue(
      Object.assign(new Error("Path `name` is required."), {
        name: "ValidationError",
      }),
    );

    const res = await request(app)
      .post("/api/backgrounds")
      .set("Cookie", `token=${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Path `name` is required." });
  });

  it("DELETE /api/backgrounds/:id returns 404 when the record doesn't exist", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "moderator", tokenVersion: 0 }) }),
    });
    const token = jwt.sign({ _id: "6a580c1ec136c681a00e62c5", tv: 0 }, "test-secret", {
      jwtid: "t1",
    });
    vi.spyOn(Background, "findByIdAndDelete").mockResolvedValue(null);

    const res = await request(app)
      .delete("/api/backgrounds/6a580c1ec136c681a00e62c6")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Background Not Found!" });
  });
});
