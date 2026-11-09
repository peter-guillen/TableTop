import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../app.js";
import Character from "./character.model.js";
import User from "../users/user.model.js";
import RevokedToken from "../auth/revokedToken.model.js";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("character routes", () => {
  it("GET /api/characters/:id with a malformed id returns 404 without querying", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "user", tokenVersion: 0 }) }),
    });
    const token = jwt.sign({ _id: "6a580c1ec136c681a00e62c5", tv: 0 }, "test-secret", {
      jwtid: "t1",
    });
    const findOne = vi.spyOn(Character, "findOne");

    const res = await request(app)
      .get("/api/characters/not-an-id")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Invalid ID" });
    expect(findOne).not.toHaveBeenCalled();
  });
});
