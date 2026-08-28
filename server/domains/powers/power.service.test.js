import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./power.model.js");

import {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower,
} from "./power.service.js";

vi.mock("./power.model.js", () => ({
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

import Power from "./power.model.js";
import { logAction } from "../../shared/utils/logger.js";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockPower = {
  _id: "power123",
  name: "Fireball",
  school: "Evocation",
  level: 3,
};

const mockUserId = "user456";

// ─── Tests ───────────────────────────────────────────────────────────────────

beforeEach(() => vi.clearAllMocks());

describe("getAllPowers", () => {
  it("returns all powers", async () => {
    Power.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockPower]),
    });

    const result = await getAllPowers();

    expect(result).toEqual([mockPower]);
    expect(Power.find).toHaveBeenCalledWith({});
  });

  it("returns an empty array when no powers exist", async () => {
    Power.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });

    const result = await getAllPowers();

    expect(result).toEqual([]);
  });
});

describe("getPowerById", () => {
  it("returns a power when found", async () => {
    Power.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockPower),
    });

    const result = await getPowerById("power123");

    expect(result).toEqual(mockPower);
    expect(Power.findById).toHaveBeenCalledWith("power123");
  });

  it("returns null when power does not exist", async () => {
    Power.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await getPowerById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createPower", () => {
  it("creates a power, logs the action, and returns the new power", async () => {
    const powerWithToObject = {
      ...mockPower,
      toObject: vi.fn().mockReturnValue(mockPower),
    };
    Power.create.mockResolvedValue(powerWithToObject);

    const result = await createPower(mockPower, mockUserId);

    expect(Power.create).toHaveBeenCalledWith(mockPower);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Power",
      target: "Power",
      targetId: mockPower._id,
      metadata: { before: null, after: mockPower },
    });
    expect(result).toEqual(powerWithToObject);
  });
});

describe("updatePower", () => {
  it("updates a power, logs the action, and returns the updated power", async () => {
    const updatedPower = { ...mockPower, name: "Frostball" };
    Power.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockPower),
    });
    Power.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updatedPower),
    });

    const result = await updatePower(
      "power123",
      { name: "Frostball" },
      mockUserId,
    );

    expect(Power.findByIdAndUpdate).toHaveBeenCalledWith(
      "power123",
      { $set: { name: "Frostball" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Power",
      target: "Power",
      targetId: updatedPower._id,
      metadata: { before: mockPower, after: updatedPower },
    });
    expect(result).toEqual(updatedPower);
  });

  it("returns null without updating when power does not exist", async () => {
    Power.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await updatePower(
      "nonexistent",
      { name: "Frostball" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Power.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deletePower", () => {
  it("deletes a power, logs the action, and returns the deleted power", async () => {
    Power.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockPower),
    });
    Power.findByIdAndDelete.mockResolvedValue();

    const result = await deletePower("power123", mockUserId);

    expect(Power.findByIdAndDelete).toHaveBeenCalledWith("power123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Power",
      target: "Power",
      targetId: mockPower._id,
      metadata: { before: mockPower, after: null },
    });
    expect(result).toEqual(mockPower);
  });

  it("returns null without deleting when power does not exist", async () => {
    Power.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await deletePower("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Power.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
