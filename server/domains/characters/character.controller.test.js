import { describe, it, expect, vi, beforeEach } from "vitest";
import Character from "./character.model.js";
import { getAllCharacters } from "./character.controller.js";
vi.mock("./character.model.js");

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

    expect(Character.find).toHaveBeenCalledWith({ user: "someUserId1234" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeCharacters);
  });

  it("should return a 400 status if the database call fails", async () => {
    const dbError = new Error("Database connection failed");

    Character.find.mockReturnValue({
      lean: vi.fn().mockRejectedValue(dbError),
    });

    const req = { user: { _id: "someUserId123" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await getAllCharacters(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: dbError.message });
  });
});
