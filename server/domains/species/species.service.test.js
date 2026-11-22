import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./species.model.js", () => ({
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

import Species from "./species.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
} from "./species.service.js";

const mockSpecies = {
  _id: "species123",
  name: "Elf",
  description: "Long-lived and keen-eyed.",
};

const mockUserId = "user456";

beforeEach(() => vi.clearAllMocks());

describe("getAllSpecies", () => {
  it("returns all species", async () => {
    Species.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockSpecies]),
    });

    const result = await getAllSpecies();

    expect(result).toEqual([mockSpecies]);
    expect(Species.find).toHaveBeenCalledWith({});
  });
});

describe("getSpeciesById", () => {
  it("returns a species when found", async () => {
    Species.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockSpecies),
    });

    const result = await getSpeciesById("species123");

    expect(result).toEqual(mockSpecies);
    expect(Species.findById).toHaveBeenCalledWith("species123");
  });

  it("returns null when the species does not exist", async () => {
    Species.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await getSpeciesById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createSpecies", () => {
  it("creates a species, logs the action, and returns it", async () => {
    const created = {
      ...mockSpecies,
      toObject: vi.fn().mockReturnValue(mockSpecies),
    };
    Species.create.mockResolvedValue(created);

    const result = await createSpecies(mockSpecies, mockUserId);

    expect(Species.create).toHaveBeenCalledWith(mockSpecies);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Species",
      target: "Species",
      targetId: mockSpecies._id,
      metadata: { before: null, after: mockSpecies },
    });
    expect(result).toEqual(created);
  });
});

describe("updateSpecies", () => {
  it("updates with validators on, logs before and after, and returns the updated species", async () => {
    const updated = { ...mockSpecies, name: "High Elf" };
    Species.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockSpecies),
    });
    Species.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updated),
    });

    const result = await updateSpecies(
      "species123",
      { name: "High Elf" },
      mockUserId,
    );

    expect(Species.findByIdAndUpdate).toHaveBeenCalledWith(
      "species123",
      { $set: { name: "High Elf" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Species",
      target: "Species",
      targetId: updated._id,
      metadata: { before: mockSpecies, after: updated },
    });
    expect(result).toEqual(updated);
  });

  it("returns null without updating or logging when the species does not exist", async () => {
    Species.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await updateSpecies(
      "nonexistent",
      { name: "High Elf" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Species.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteSpecies", () => {
  it("deletes a species, logs the action, and returns the deleted species", async () => {
    Species.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockSpecies),
    });
    Species.findByIdAndDelete.mockResolvedValue();

    const result = await deleteSpecies("species123", mockUserId);

    expect(Species.findByIdAndDelete).toHaveBeenCalledWith("species123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Species",
      target: "Species",
      targetId: mockSpecies._id,
      metadata: { before: mockSpecies, after: null },
    });
    expect(result).toEqual(mockSpecies);
  });

  it("returns null without deleting or logging when the species does not exist", async () => {
    Species.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await deleteSpecies("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Species.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
