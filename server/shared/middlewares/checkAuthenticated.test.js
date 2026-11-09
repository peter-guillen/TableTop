import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import jwt from "jsonwebtoken";
import checkAuthenticated from "./checkAuthenticated.js";
import User from "../../domains/users/user.model.js";
import RevokedToken from "../../domains/auth/revokedToken.model.js";

// Real JWTs signed with a test secret. Only the two database lookups
// (RevokedToken.exists and User.findById) are replaced.
beforeEach(() => {
  vi.stubEnv("JWT_SECRET", "test-secret");
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("checkAuthenticated", () => {
  it("returns 401 when there is no token", async () => {
    const req = { cookies: {} };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when the token is signed with the wrong secret", async () => {
    const token = jwt.sign({ _id: "u1", tv: 0 }, "wrong-secret", {
      jwtid: "id-1",
    });
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 for an older token that has no id (made before revocation existed)", async () => {
    const token = jwt.sign({ _id: "u1", role: "user" }, "test-secret");
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when the token was logged out, without looking up the user", async () => {
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "exists").mockResolvedValue({ _id: "r1" });
    const findById = vi.spyOn(User, "findById");
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(RevokedToken.exists).toHaveBeenCalledWith({ jti: "id-1" });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized: Session has ended",
    });
    expect(findById).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when the user has been deleted", async () => {
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => null }),
    });
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized: User not found",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when the user's tokenVersion has moved past the token's", async () => {
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "user", tokenVersion: 1 }) }),
    });
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized: Session has ended",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with the role from the database, not the one in the token", async () => {
    const token = jwt.sign({ _id: "u1", role: "user", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({
        lean: async () => ({ role: "editor", tokenVersion: 0 }),
      }),
    });
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ _id: "u1", role: "editor" });
  });

  it("accepts an older account with no tokenVersion field as version 0", async () => {
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "exists").mockResolvedValue(null);
    vi.spyOn(User, "findById").mockReturnValue({
      select: () => ({ lean: async () => ({ role: "user" }) }),
    });
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("returns 500 instead of crashing when the database fails", async () => {
    const token = jwt.sign({ _id: "u1", tv: 0 }, "test-secret", {
      jwtid: "id-1",
    });
    vi.spyOn(RevokedToken, "exists").mockRejectedValue(
      new Error("connection lost"),
    );
    const req = { cookies: { token } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    await checkAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(next).not.toHaveBeenCalled();
  });
});
