import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./user.model.js", () => {
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
  updateUserRole,
  deleteUser,
  updateMyProfile,
} from "./user.service.js";

const adminId = "admin001";

const mockUser = {
  _id: "user123",
  username: "someone",
  email: "someone@example.com",
  role: "user",
  profile: { bio: "Hi" },
};

beforeEach(() => vi.clearAllMocks());

describe("getAllUsers", () => {
  it("returns every user without the password", async () => {
    const select = vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockUser]),
    });
    User.find.mockReturnValue({ select });

    const result = await getAllUsers();

    expect(result).toEqual([mockUser]);
    expect(User.find).toHaveBeenCalledWith({});
    expect(select).toHaveBeenCalledWith("-password");
  });
});

describe("getUserById", () => {
  it("returns the user without the password", async () => {
    const select = vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockUser),
    });
    User.findById.mockReturnValue({ select });

    const result = await getUserById("user123");

    expect(result).toEqual(mockUser);
    expect(User.findById).toHaveBeenCalledWith("user123");
    expect(select).toHaveBeenCalledWith("-password");
  });
});

describe("createUser", () => {
  it("saves only email, username and password, ignoring a role, and logs nothing", async () => {
    const save = vi.fn().mockResolvedValue();
    User.mockImplementation(function (data) {
      Object.assign(this, data);
      this.save = save;
    });

    const result = await createUser({
      email: "new@example.com",
      username: "newbie",
      password: "secret123",
      role: "admin",
    });

    expect(User).toHaveBeenCalledWith({
      email: "new@example.com",
      username: "newbie",
      password: "secret123",
    });
    expect(save).toHaveBeenCalled();
    expect(result.role).toBeUndefined();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("updateUserRole", () => {
  it("refuses to change the admin's own role, without querying", async () => {
    await expect(updateUserRole(adminId, "user", adminId)).rejects.toMatchObject(
      { message: "You cannot change your own role", status: 400 },
    );

    expect(User.findById).not.toHaveBeenCalled();
    expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });

  it("returns null without updating or logging when the user doesn't exist", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(null) }),
    });

    const result = await updateUserRole("missing", "editor", adminId);

    expect(result).toBeNull();
    expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });

  it("updates the role with validators on and logs only username and role", async () => {
    const updated = { ...mockUser, role: "editor" };
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(mockUser) }),
    });
    User.findByIdAndUpdate.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(updated) }),
    });

    const result = await updateUserRole("user123", "editor", adminId);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user123",
      { $set: { role: "editor" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: adminId,
      action: "Updated User Role",
      target: "User",
      targetId: "user123",
      metadata: {
        before: { username: "someone", role: "user" },
        after: { username: "someone", role: "editor" },
      },
    });
    expect(result).toEqual(updated);
  });
});

describe("deleteUser", () => {
  it("refuses to delete the admin's own account, without querying", async () => {
    await expect(deleteUser(adminId, adminId)).rejects.toMatchObject({
      message: "You cannot delete your own account",
      status: 400,
    });

    expect(User.findById).not.toHaveBeenCalled();
    expect(User.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });

  it("returns null without deleting or logging when the user doesn't exist", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(null) }),
    });

    const result = await deleteUser("missing", adminId);

    expect(result).toBeNull();
    expect(User.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });

  it("deletes the user, logs only username and role, and returns the deleted user", async () => {
    User.findById.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(mockUser) }),
    });
    User.findByIdAndDelete.mockResolvedValue();

    const result = await deleteUser("user123", adminId);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("user123");
    expect(logAction).toHaveBeenCalledWith({
      userId: adminId,
      action: "Deleted User",
      target: "User",
      targetId: "user123",
      metadata: {
        before: { username: "someone", role: "user" },
        after: null,
      },
    });
    expect(result).toEqual(mockUser);
  });
});

describe("updateMyProfile", () => {
  it("saves only the profile fields, trimmed, and logs nothing", async () => {
    const updated = { ...mockUser, profile: { name: "Sam" } };
    User.findByIdAndUpdate.mockReturnValue({
      select: () => ({ lean: vi.fn().mockResolvedValue(updated) }),
    });

    const result = await updateMyProfile("user123", {
      name: "  Sam  ",
      showName: "yes",
      bio: " Hello ",
      role: "admin",
    });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user123",
      {
        profile: {
          name: "Sam",
          showName: true,
          pronouns: "",
          bio: "Hello",
          location: "",
          timeZone: "",
        },
      },
      { new: true, runValidators: true },
    );
    expect(logAction).not.toHaveBeenCalled();
    expect(result).toEqual(updated);
  });
});
