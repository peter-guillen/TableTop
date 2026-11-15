import { describe, it, expect, vi, beforeEach } from "vitest";
import Character from "./character.model.js";
import { logAction } from "../../shared/utils/logger.js";
import { getAllCharacters, deleteCharacter } from "./character.controller.js";
vi.mock("./character.model.js");
vi.mock("../../shared/utils/logger.js");

beforeEach(() => vi.clearAllMocks());

describe("characterController", () => {
  it("should return all characters with a 200 status", async () => {
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

  it("should return a 400 status for bad input (CastError)", async () => {
    const castError = new Error("Cast to ObjectId failed");
    castError.name = "CastError";

    Character.find.mockReturnValue({
      lean: vi.fn().mockRejectedValue(castError),
    });

    const req = { user: { _id: "someUserId123" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await getAllCharacters(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: castError.message });
  });

  it("deleteCharacter deletes only the user's own character and logs it", async () => {
    const deleted = { _id: "charId1", name: "Batman", userId: "someUserId123" };

    Character.findOneAndDelete.mockReturnValue({
      lean: vi.fn().mockResolvedValue(deleted),
    });

    const req = { params: { id: "charId1" }, user: { _id: "someUserId123" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await deleteCharacter(req, res);

    expect(Character.findOneAndDelete).toHaveBeenCalledWith({
      _id: "charId1",
      userId: "someUserId123",
    });
    expect(logAction).toHaveBeenCalledWith({
      userId: "someUserId123",
      action: "Deleted Character",
      target: "Character",
      targetId: "charId1",
      metadata: { before: deleted, after: null },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  it("deleteCharacter returns 404 and logs nothing when the character isn't the user's", async () => {
    Character.findOneAndDelete.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    const req = { params: { id: "charId1" }, user: { _id: "otherUserId" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await deleteCharacter(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Character Not Found!" });
    expect(logAction).not.toHaveBeenCalled();
  });
});
