import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./background.model.js", () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

vi.mock("../../shared/utils/logger.js", () => ({
  logAction: vi.fn(),
}));

import Background from "./background.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  updateBackground,
  deleteBackground,
} from "./background.service.js";

const mockBackground = {
  _id: "background123",
  name: "Soldier",
  description: "Trained for war.",
};

const mockUserId = "user456";

beforeEach(() => vi.clearAllMocks());

describe("getAllBackgrounds", () => {
  it("returns all backgrounds", async () => {
    Background.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockBackground]),
    });

    const result = await getAllBackgrounds();

    expect(result).toEqual([mockBackground]);
    expect(Background.find).toHaveBeenCalledWith({});
  });
});

describe("getBackgroundById", () => {
  it("returns a background when found", async () => {
    Background.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockBackground),
    });

    const result = await getBackgroundById("background123");

    expect(result).toEqual(mockBackground);
    expect(Background.findById).toHaveBeenCalledWith("background123");
  });

  it("returns null when the background does not exist", async () => {
    Background.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await getBackgroundById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createBackground", () => {
  it("creates a background, logs the action, and returns it", async () => {
    const created = {
      ...mockBackground,
      toObject: vi.fn().mockReturnValue(mockBackground),
    };
    Background.create.mockResolvedValue(created);

    const result = await createBackground(mockBackground, mockUserId);

    expect(Background.create).toHaveBeenCalledWith(mockBackground);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Background",
      target: "Background",
      targetId: mockBackground._id,
      metadata: { before: null, after: mockBackground },
    });
    expect(result).toEqual(created);
  });
});

describe("updateBackground", () => {
  it("updates with validators on, logs before and after, and returns the updated background", async () => {
    const updated = { ...mockBackground, name: "Veteran" };
    Background.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockBackground),
    });
    Background.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updated),
    });

    const result = await updateBackground(
      "background123",
      { name: "Veteran" },
      mockUserId,
    );

    expect(Background.findByIdAndUpdate).toHaveBeenCalledWith(
      "background123",
      { $set: { name: "Veteran" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Background",
      target: "Background",
      targetId: updated._id,
      metadata: { before: mockBackground, after: updated },
    });
    expect(result).toEqual(updated);
  });

  it("returns null without updating or logging when the background does not exist", async () => {
    Background.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await updateBackground(
      "nonexistent",
      { name: "Veteran" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Background.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteBackground", () => {
  it("deletes a background, logs the action, and returns the deleted background", async () => {
    Background.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockBackground),
    });
    Background.findByIdAndDelete.mockResolvedValue();

    const result = await deleteBackground("background123", mockUserId);

    expect(Background.findByIdAndDelete).toHaveBeenCalledWith("background123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Background",
      target: "Background",
      targetId: mockBackground._id,
      metadata: { before: mockBackground, after: null },
    });
    expect(result).toEqual(mockBackground);
  });

  it("returns null without deleting or logging when the background does not exist", async () => {
    Background.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await deleteBackground("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Background.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
