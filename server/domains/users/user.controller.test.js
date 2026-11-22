import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./user.service.js", () => ({
  getAllUsers: vi.fn(),
  getUserById: vi.fn(),
  createUser: vi.fn(),
  deleteUser: vi.fn(),
  updateUserRole: vi.fn(),
  updateMyProfile: vi.fn(),
}));

import * as userService from "./user.service.js";
import {
  getUserById,
  deleteUser,
  updateUserRole,
  updateMyProfile,
} from "./user.controller.js";

const makeRes = () => ({ status: vi.fn().mockReturnThis(), json: vi.fn() });

beforeEach(() => vi.clearAllMocks());

describe("getUserById", () => {
  it("returns 400 with the message for a bad id", async () => {
    const castError = Object.assign(new Error("Cast to ObjectId failed"), {
      name: "CastError",
    });
    userService.getUserById.mockRejectedValue(castError);
    const res = makeRes();

    await getUserById({ params: { id: "x" } }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Cast to ObjectId failed" });
  });

  it("returns a generic 500 when the database fails", async () => {
    userService.getUserById.mockRejectedValue(new Error("connection lost"));
    const res = makeRes();

    await getUserById({ params: { id: "user1" } }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to load user" });
  });
});

describe("deleteUser", () => {
  it("passes the service's own-account refusal to next", async () => {
    // The service throws with status 400; the app error handler answers it
    const error = Object.assign(new Error("You cannot delete your own account"), {
      status: 400,
    });
    userService.deleteUser.mockRejectedValue(error);
    const next = vi.fn();

    await deleteUser({ params: { id: "admin1" }, user: { _id: "admin1" } }, makeRes(), next);

    expect(userService.deleteUser).toHaveBeenCalledWith("admin1", "admin1");
    expect(next).toHaveBeenCalledWith(error);
  });

  it("passes the admin as the actor and returns the deleted user", async () => {
    userService.deleteUser.mockResolvedValue({ _id: "user1" });
    const res = makeRes();

    await deleteUser({ params: { id: "user1" }, user: { _id: "admin1" } }, res, vi.fn());

    expect(userService.deleteUser).toHaveBeenCalledWith("user1", "admin1");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("updateUserRole", () => {
  it("passes the service's own-role refusal to next", async () => {
    const error = Object.assign(new Error("You cannot change your own role"), {
      status: 400,
    });
    userService.updateUserRole.mockRejectedValue(error);
    const next = vi.fn();

    await updateUserRole(
      { params: { id: "admin1" }, body: { role: "user" }, user: { _id: "admin1" } },
      makeRes(),
      next,
    );

    expect(userService.updateUserRole).toHaveBeenCalledWith("admin1", "user", "admin1");
    expect(next).toHaveBeenCalledWith(error);
  });

  it("returns 404 when the user does not exist", async () => {
    userService.updateUserRole.mockResolvedValue(null);
    const res = makeRes();

    await updateUserRole(
      { params: { id: "user1" }, body: { role: "editor" }, user: { _id: "admin1" } },
      res,
      vi.fn(),
    );

    expect(userService.updateUserRole).toHaveBeenCalledWith("user1", "editor", "admin1");
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("passes errors to next so the app error handler answers", async () => {
    const error = new Error("connection lost");
    userService.updateUserRole.mockRejectedValue(error);
    const next = vi.fn();

    await updateUserRole(
      { params: { id: "user1" }, body: { role: "editor" }, user: { _id: "admin1" } },
      makeRes(),
      next,
    );

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("updateMyProfile", () => {
  it("updates the logged-in user's profile from the request body", async () => {
    userService.updateMyProfile.mockResolvedValue({ _id: "user1" });
    const res = makeRes();

    await updateMyProfile(
      { user: { _id: "user1" }, body: { profile: { name: "Sam" } } },
      res,
      vi.fn(),
    );

    expect(userService.updateMyProfile).toHaveBeenCalledWith("user1", { name: "Sam" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("passes errors to next so the app error handler answers", async () => {
    const error = Object.assign(new Error("too long"), { name: "ValidationError" });
    userService.updateMyProfile.mockRejectedValue(error);
    const next = vi.fn();

    await updateMyProfile({ user: { _id: "user1" }, body: {} }, makeRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
