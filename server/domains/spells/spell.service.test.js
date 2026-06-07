import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./spell.model.js");

import {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell,
} from "./spell.service.js";

vi.mock("./spell.model.js", () => ({
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

import Spell from "./spell.model.js";
import { logAction } from "../../shared/utils/logger.js";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockSpell = {
  _id: "spell123",
  name: "Fireball",
  school: "Evocation",
  level: 3,
};

const mockUserId = "user456";

// ─── Tests ───────────────────────────────────────────────────────────────────

beforeEach(() => vi.clearAllMocks());

describe("getAllSpells", () => {
  it("returns all spells", async () => {
    Spell.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockSpell]),
    });

    const result = await getAllSpells();

    expect(result).toEqual([mockSpell]);
    expect(Spell.find).toHaveBeenCalledWith({});
  });

  it("returns an empty array when no spells exist", async () => {
    Spell.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });

    const result = await getAllSpells();

    expect(result).toEqual([]);
  });
});

describe("getSpellById", () => {
  it("returns a spell when found", async () => {
    Spell.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockSpell),
    });

    const result = await getSpellById("spell123");

    expect(result).toEqual(mockSpell);
    expect(Spell.findById).toHaveBeenCalledWith("spell123");
  });

  it("returns null when spell does not exist", async () => {
    Spell.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await getSpellById("nonexistent");

    expect(result).toBeNull();
  });
});

describe("createSpell", () => {
  it("creates a spell, logs the action, and returns the new spell", async () => {
    const spellWithToObject = {
      ...mockSpell,
      toObject: vi.fn().mockReturnValue(mockSpell),
    };
    Spell.create.mockResolvedValue(spellWithToObject);

    const result = await createSpell(mockSpell, mockUserId);

    expect(Spell.create).toHaveBeenCalledWith(mockSpell);
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Spell",
      target: "Spell",
      targetId: mockSpell._id,
      metadata: { before: null, after: mockSpell },
    });
    expect(result).toEqual(spellWithToObject);
  });
});

describe("updateSpell", () => {
  it("updates a spell, logs the action, and returns the updated spell", async () => {
    const updatedSpell = { ...mockSpell, name: "Frostball" };
    Spell.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockSpell),
    });
    Spell.findByIdAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updatedSpell),
    });

    const result = await updateSpell(
      "spell123",
      { name: "Frostball" },
      mockUserId,
    );

    expect(Spell.findByIdAndUpdate).toHaveBeenCalledWith(
      "spell123",
      { $set: { name: "Frostball" } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Spell",
      target: "Spell",
      targetId: updatedSpell._id,
      metadata: { before: mockSpell, after: updatedSpell },
    });
    expect(result).toEqual(updatedSpell);
  });

  it("returns null without updating when spell does not exist", async () => {
    Spell.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await updateSpell(
      "nonexistent",
      { name: "Frostball" },
      mockUserId,
    );

    expect(result).toBeNull();
    expect(Spell.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteSpell", () => {
  it("deletes a spell, logs the action, and returns the deleted spell", async () => {
    Spell.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockSpell),
    });
    Spell.findByIdAndDelete.mockResolvedValue();

    const result = await deleteSpell("spell123", mockUserId);

    expect(Spell.findByIdAndDelete).toHaveBeenCalledWith("spell123");
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Spell",
      target: "Spell",
      targetId: mockSpell._id,
      metadata: { before: mockSpell, after: null },
    });
    expect(result).toEqual(mockSpell);
  });

  it("returns null without deleting when spell does not exist", async () => {
    Spell.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

    const result = await deleteSpell("nonexistent", mockUserId);

    expect(result).toBeNull();
    expect(Spell.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});
