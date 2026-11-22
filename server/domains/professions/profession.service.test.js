import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./profession.model.js", () => ({
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

import Profession from "./profession.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getAllProfessions,
  getProfessionById,
  createProfession,
  updateProfession,
  deleteProfession,
} from "./profession.service.js";

const mockProfession = {
  _id: "profession123",
  name: "Ranger",
  description: "Hunts and tracks.",
};

const mockUserId = "user456";

beforeEach(() => vi.clearAllMocks());

describe("getAllProfessions", () => {
  it("returns all professions", async () => {
    Profession.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockProfession]),
    });

    const result = await getAllProfessions();

    expect(result).toEqual([mockProfession]);
    expect(Profession.find).toHaveBeenCalledWith({});
  });
});

describe("getProfessionById", () => {
  it("returns a profession when found", async () => {
    Profession.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockProfession),
    });

    const result = await getProfessionById("profession123");

    expect(result).toEqual(mockProfession);
    expect(Profession.findById).toHaveBeenCalledWith("profession123");
  });

  it("returns null when the profession does not exist", async () => {
    Profession.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await getProfessionById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createProfession", () => {
  it("creates a profession, logs the action, and returns it", async () => {
    const created = {
      ...mockProfession,
      toObject: vi.fn().mockReturnValue(mockProfession),
    };
    Profession.create.mockResolvedValue(created);

    const result = await createProfession(mockProfession, mockUserId);

    expect(Profession.create).toHaveBeenCalledWith(mockProfession);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Profession",
      target: "Profession",
      targetId: mockProfession._id,
      metadata: { before: null, after: mockProfession },
    });
    expect(result).toEqual(created);
  });
});

describe("updateProfession", () => {
  it("updates with validators on, logs before and after, and returns the updated profession", async () => {
    const updated = { ...mockProfession, name: "Warden" };
    Profession.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockProfession),
    });
    Profession.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updated),
    });

    const result = await updateProfession(
      "profession123",
      { name: "Warden" },
      mockUserId,
    );

    expect(Profession.findByIdAndUpdate).toHaveBeenCalledWith(
      "profession123",
      { $set: { name: "Warden" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Profession",
      target: "Profession",
      targetId: updated._id,
      metadata: { before: mockProfession, after: updated },
    });
    expect(result).toEqual(updated);
  });

  it("returns null without updating or logging when the profession does not exist", async () => {
    Profession.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await updateProfession(
      "nonexistent",
      { name: "Warden" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Profession.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteProfession", () => {
  it("deletes a profession, logs the action, and returns the deleted profession", async () => {
    Profession.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockProfession),
    });
    Profession.findByIdAndDelete.mockResolvedValue();

    const result = await deleteProfession("profession123", mockUserId);

    expect(Profession.findByIdAndDelete).toHaveBeenCalledWith("profession123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Profession",
      target: "Profession",
      targetId: mockProfession._id,
      metadata: { before: mockProfession, after: null },
    });
    expect(result).toEqual(mockProfession);
  });

  it("returns null without deleting or logging when the profession does not exist", async () => {
    Profession.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await deleteProfession("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Profession.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
