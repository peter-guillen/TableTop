import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./user.model.js", () => {
  // Signup uses `new User(...)`, so the default export is a constructor that
  // also carries the static query methods
  const User = vi.fn();
  User.find = vi.fn();
  User.findById = vi.fn();
  User.findByIdAndUpdate = vi.fn();
  User.findByIdAndDelete = vi.fn();
  return { default: User };
});

vi.mock("../../shared/utils/logger.js", () => ({
  logAction: vi.fn(),
}));

import User from "./user.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserRole,
  updateMyProfile,
} from "./user.service.js";

const adminId = "admin1";
const userBefore = {
  _id: "user1",
  username: "someone",
  email: "someone@example.com",
  role: "user",
  profile: { name: "", showName: false, pronouns: "", bio: "", location: "", timeZone: "" },
};

beforeEach(() => vi.clearAllMocks());

describe("getAllUsers", () => {
  it("returns every user without passwords", async () => {
    const select = vi.fn().mockResolvedValue([userBefore]);
    User.find.mockReturnValue({ select });

    const result = await getAllUsers();

    expect(result).toEqual([userBefore]);
    expect(User.find).toHaveBeenCalledWith({});
    expect(select).toHaveBeenCalledWith("-password");
  });
});

describe("getUserById", () => {
  it("returns the user without the password", async () => {
    const select = vi.fn().mockResolvedValue(userBefore);
    User.findById.mockReturnValue({ select });

    const result = await getUserById("user1");

    expect(result).toEqual(userBefore);
    expect(User.findById).toHaveBeenCalledWith("user1");
    expect(select).toHaveBeenCalledWith("-password");
  });

  it("returns null when the user does not exist", async () => {
    User.findById.mockReturnValue({ select: vi.fn().mockResolvedValue(null) });

    expect(await getUserById("missing")).toBeNull();
  });
});

describe("createUser", () => {
  it("saves only email, username and password, then logs without the hash", async () => {
    const save = vi.fn().mockResolvedValue();
    const toObject = () => ({ ...userBefore, password: "hashed" });
    User.mockImplementation(function (data) {
      Object.assign(this, { _id: "user1", role: "user", ...data, save, toObject });
    });

    const result = await createUser({
      email: "someone@example.com",
      username: "someone",
      password: "a-password",
    });

    expect(User).toHaveBeenCalledWith({
      email: "someone@example.com",
      username: "someone",
      password: "a-password",
    });
    expect(save).toHaveBeenCalled();
    expect(result._id).toBe("user1");
    expect(logAction).toHaveBeenCalledWith({
      userId: "user1",
      action: "Created User",
      target: "User",
      targetId: "user1",
      metadata: { before: null, after: userBefore },
    });
  });

  it("does not log when saving fails", async () => {
    const save = vi.fn().mockRejectedValue({ code: 11000 });
    User.mockImplementation(function () {
      Object.assign(this, { save });
    });

    await expect(createUser({})).rejects.toEqual({ code: 11000 });
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteUser", () => {
  it("deletes the user and logs the admin as the actor", async () => {
    const deleted = { ...userBefore, toObject: () => userBefore };
    User.findByIdAndDelete.mockReturnValue({
      select: vi.fn().mockResolvedValue(deleted),
    });

    const result = await deleteUser("user1", adminId);

    expect(result).toBe(deleted);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith("user1");
    expect(logAction).toHaveBeenCalledWith({
      userId: adminId,
      action: "Deleted User",
      target: "User",
      targetId: "user1",
      metadata: { before: userBefore, after: null },
    });
  });

  it("returns null and logs nothing when the user does not exist", async () => {
    User.findByIdAndDelete.mockReturnValue({
      select: vi.fn().mockResolvedValue(null),
    });

    expect(await deleteUser("missing", adminId)).toBeNull();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("updateUserRole", () => {
  it("updates the role with validators and logs before and after", async () => {
    const after = { ...userBefore, role: "editor" };
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(userBefore) }),
    });
    User.findByIdAndUpdate.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(after) }),
    });

    const result = await updateUserRole("user1", "editor", adminId);

    expect(result).toEqual(after);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user1",
      { role: "editor" },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: adminId,
      action: "Updated User Role",
      target: "User",
      targetId: "user1",
      metadata: { before: userBefore, after },
    });
  });

  it("returns null without updating when the user does not exist", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(null) }),
    });

    expect(await updateUserRole("missing", "editor", adminId)).toBeNull();
    expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("users deleted mid-update", () => {
  it("updateUserRole returns null and logs nothing when the user disappears before the update", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(userBefore) }),
    });
    User.findByIdAndUpdate.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(null) }),
    });

    expect(await updateUserRole("user1", "editor", adminId)).toBeNull();
    expect(logAction).not.toHaveBeenCalled();
  });

  it("updateMyProfile returns null and logs nothing when the user disappears before the update", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(userBefore) }),
    });
    User.findByIdAndUpdate.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(null) }),
    });

    expect(await updateMyProfile("user1", { name: "Sam" })).toBeNull();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("updateMyProfile", () => {
  it("saves only the profile keys, trimmed, and logs the user as the actor", async () => {
    const after = { ...userBefore, profile: { ...userBefore.profile, name: "Sam" } };
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(userBefore) }),
    });
    User.findByIdAndUpdate.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(after) }),
    });

    const result = await updateMyProfile("user1", {
      name: "  Sam  ",
      showName: "yes",
      role: "admin",
    });

    expect(result).toEqual(after);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user1",
      {
        profile: {
          name: "Sam",
          showName: true,
          pronouns: "",
          bio: "",
          location: "",
          timeZone: "",
        },
      },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: "user1",
      action: "Updated Profile",
      target: "User",
      targetId: "user1",
      metadata: { before: userBefore, after },
    });
  });

  it("returns null when the user no longer exists", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(null) }),
    });

    expect(await updateMyProfile("gone", {})).toBeNull();
    expect(logAction).not.toHaveBeenCalled();
  });
});
