import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../users/user.model.js", () => ({
  default: { findById: vi.fn(), findOne: vi.fn() },
}));
vi.mock("./revokedToken.model.js", () => ({
  default: { updateOne: vi.fn() },
}));
vi.mock("../../shared/utils/logger.js", () => ({
  logAction: vi.fn(),
}));

import User from "../users/user.model.js";
import RevokedToken from "./revokedToken.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getCurrentUser,
  findUserByCredentials,
  revokeToken,
} from "./auth.service.js";

beforeEach(() => vi.clearAllMocks());

describe("getCurrentUser", () => {
  it("loads the user without the password", async () => {
    const user = { _id: "user1", username: "someone" };
    const select = vi.fn().mockResolvedValue(user);
    User.findById.mockReturnValue({ select });

    expect(await getCurrentUser("user1")).toEqual(user);
    expect(User.findById).toHaveBeenCalledWith("user1");
    expect(select).toHaveBeenCalledWith("-password");
  });
});

describe("findUserByCredentials", () => {
  it("returns the user when the password matches, trimming the email", async () => {
    const comparePassword = vi.fn().mockResolvedValue(true);
    const user = { _id: "user1", comparePassword };
    User.findOne.mockResolvedValue(user);

    const result = await findUserByCredentials(" someone@example.com ", "pw");

    expect(result).toBe(user);
    expect(User.findOne).toHaveBeenCalledWith({ email: "someone@example.com" });
    expect(comparePassword).toHaveBeenCalledWith("pw");
  });

  it("returns null when the password is wrong", async () => {
    User.findOne.mockResolvedValue({
      comparePassword: vi.fn().mockResolvedValue(false),
    });

    expect(await findUserByCredentials("someone@example.com", "bad")).toBeNull();
  });

  it("returns null when no user has that email, including a missing email", async () => {
    User.findOne.mockResolvedValue(null);

    expect(await findUserByCredentials(undefined, "pw")).toBeNull();
    expect(User.findOne).toHaveBeenCalledWith({ email: "" });
  });

  it("does not write to the activity log", async () => {
    User.findOne.mockResolvedValue({
      comparePassword: vi.fn().mockResolvedValue(true),
    });

    await findUserByCredentials("someone@example.com", "pw");

    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("revokeToken", () => {
  it("upserts the token id, expiring when the token would", async () => {
    RevokedToken.updateOne.mockResolvedValue({});

    await revokeToken("jti-1", 1700000000);

    expect(RevokedToken.updateOne).toHaveBeenCalledWith(
      { jti: "jti-1" },
      { $setOnInsert: { expiresAt: new Date(1700000000 * 1000) } },
      { upsert: true },
    );
    expect(logAction).not.toHaveBeenCalled();
  });
});
