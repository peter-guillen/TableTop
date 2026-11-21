import { describe, it, expect, vi, beforeEach } from "vitest";
import Character from "./character.model.js";
import { logAction } from "../../shared/utils/logger.js";
import { getAllCharacters, deleteCharacter } from "./character.controller.js";
vi.mock("./character.model.js");
vi.mock("../../shared/utils/logger.js");

beforeEach(() => vi.clearAllMocks());

describe("characterController", () => {
  it("should return the user's characters with a 200 status", async () => {
    const fakeCharacters = [{ name: "Batman" }, { name: "Robin" }];

    Character.find.mockReturnValue({
      lean: vi.fn().mockResolvedValue(fakeCharacters),
    });

    const req = { user: { _id: "someUserId1234" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await getAllCharacters(req, res);

    expect(Character.find).toHaveBeenCalledWith({ userId: "someUserId1234" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeCharacters);
  });

  it("should return a 500 status if the database call fails", async () => {
    const dbError = new Error("Database connection failed");

    Character.find.mockReturnValue({
      lean: vi.fn().mockRejectedValue(dbError),
    });

    const req = { user: { _id: "someUserId123" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await getAllCharacters(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: dbError.message });
  });

  it("deletes only the user's own character and logs it", async () => {
    const deleted = { _id: "char1", userId: "user1", identity: { name: "Robin" } };
    Character.findOneAndDelete.mockReturnValue({
      lean: vi.fn().mockResolvedValue(deleted),
    });

    const req = { params: { id: "char1" }, user: { _id: "user1" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await deleteCharacter(req, res);

    expect(Character.findOneAndDelete).toHaveBeenCalledWith({
      _id: "char1",
      userId: "user1",
    });
    expect(Character.findByIdAndDelete).not.toHaveBeenCalled();
    expect(logAction).toHaveBeenCalledWith({
      userId: "user1",
      action: "Deleted Character",
      target: "Character",
      targetId: "char1",
      metadata: { before: deleted, after: null },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  it("returns 404 when the character is missing or belongs to someone else", async () => {
    Character.findOneAndDelete.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const req = { params: { id: "char1" }, user: { _id: "otherUser" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await deleteCharacter(req, res);

    expect(Character.findOneAndDelete).toHaveBeenCalledWith({
      _id: "char1",
      userId: "otherUser",
    });
    expect(logAction).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Character Not Found!" });
  });
});
