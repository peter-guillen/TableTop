import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./character.service.js");

import * as characterService from "./character.service.js";
import { getAllCharacters } from "./character.controller.js";

beforeEach(() => vi.clearAllMocks());

describe("characterController", () => {
  it("should return the user's characters with a 200 status", async () => {
    const fakeCharacters = [
      { identity: { name: "Batman" } },
      { identity: { name: "Robin" } },
    ];
    characterService.getAllCharacters.mockResolvedValue(fakeCharacters);

    const req = { user: { _id: "someUserId1234" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await getAllCharacters(req, res);

    expect(characterService.getAllCharacters).toHaveBeenCalledWith(
      "someUserId1234",
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeCharacters);
  });

  it("should return a 500 without the details if the database call fails", async () => {
    characterService.getAllCharacters.mockRejectedValue(
      new Error("Database connection failed"),
    );

    const req = { user: { _id: "someUserId123" } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await getAllCharacters(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to load characters",
    });
  });
});
