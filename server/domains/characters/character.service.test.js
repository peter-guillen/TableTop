import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./character.model.js", () => ({
  default: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

vi.mock("../../shared/utils/logger.js", () => ({
  logAction: vi.fn(),
}));

import Character from "./character.model.js";
import { logAction } from "../../shared/utils/logger.js";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "./character.service.js";

const mockUserId = "user456";

const mockCharacter = {
  _id: "character123",
  userId: mockUserId,
  identity: { name: "Aria" },
  mode: "classed",
};

beforeEach(() => vi.clearAllMocks());

describe("getAllCharacters", () => {
  it("returns only the user's characters", async () => {
    Character.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockCharacter]),
    });

    const result = await getAllCharacters(mockUserId);

    expect(result).toEqual([mockCharacter]);
    expect(Character.find).toHaveBeenCalledWith({ userId: mockUserId });
  });
});

describe("getCharacterById", () => {
  it("looks the character up by id and owner", async () => {
    Character.findOne.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockCharacter),
    });

    const result = await getCharacterById("character123", mockUserId);

    expect(result).toEqual(mockCharacter);
    expect(Character.findOne).toHaveBeenCalledWith({
      _id: "character123",
      userId: mockUserId,
    });
  });

  it("returns null when the character doesn't exist or belongs to someone else", async () => {
    Character.findOne.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await getCharacterById("character123", "otherUser");

    expect(result).toBeNull();
  });
});

describe("createCharacter", () => {
  it("drops fields outside the allowlist, sets the owner, logs, and returns the character", async () => {
    const created = {
      ...mockCharacter,
      toObject: vi.fn().mockReturnValue(mockCharacter),
    };
    Character.create.mockResolvedValue(created);

    const result = await createCharacter(
      {
        identity: { name: "Aria" },
        mode: "classed",
        userId: "attackerId",
        _id: "forcedId",
      },
      mockUserId,
    );

    expect(Character.create).toHaveBeenCalledWith({
      identity: { name: "Aria" },
      mode: "classed",
      userId: mockUserId,
    });
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Created Character",
      target: "Character",
      targetId: mockCharacter._id,
      metadata: { before: null, after: mockCharacter },
    });
    expect(result).toEqual(created);
  });
});

describe("updateCharacter", () => {
  it("updates only allowed fields on the owner's character and logs before and after", async () => {
    const updated = { ...mockCharacter, identity: { name: "Aria II" } };
    Character.findOne.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockCharacter),
    });
    Character.findOneAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue(updated),
    });

    const result = await updateCharacter(
      "character123",
      { identity: { name: "Aria II" }, userId: "attackerId" },
      mockUserId,
    );

    expect(Character.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "character123", userId: mockUserId },
      { $set: { identity: { name: "Aria II" } } },
      { new: true, runValidators: true },
    );
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Updated Character",
      target: "Character",
      targetId: updated._id,
      metadata: { before: mockCharacter, after: updated },
    });
    expect(result).toEqual(updated);
  });

  it("returns null without updating or logging when the character isn't the user's", async () => {
    Character.findOne.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await updateCharacter(
      "character123",
      { identity: { name: "Aria II" } },
      "otherUser",
    );

    expect(result).toBeNull();
    expect(Character.findOneAndUpdate).not.toHaveBeenCalled();
    expect(logAction).not.toHaveBeenCalled();
  });
});

describe("deleteCharacter", () => {
  it("deletes the owner's character, logs, and returns it", async () => {
    Character.findOneAndDelete.mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockCharacter),
    });

    const result = await deleteCharacter("character123", mockUserId);

    expect(Character.findOneAndDelete).toHaveBeenCalledWith({
      _id: "character123",
      userId: mockUserId,
    });
    expect(logAction).toHaveBeenCalledWith({
      userId: mockUserId,
      action: "Deleted Character",
      target: "Character",
      targetId: mockCharacter._id,
      metadata: { before: mockCharacter, after: null },
    });
    expect(result).toEqual(mockCharacter);
  });

  it("returns null without logging when the character isn't the user's", async () => {
    Character.findOneAndDelete.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const result = await deleteCharacter("character123", "otherUser");

    expect(result).toBeNull();
    // The owner filter is part of the delete itself
    expect(Character.findOneAndDelete).toHaveBeenCalledWith({
      _id: "character123",
      userId: "otherUser",
    });
    expect(logAction).not.toHaveBeenCalled();
  });
});
