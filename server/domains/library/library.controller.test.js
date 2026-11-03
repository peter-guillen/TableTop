import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLibrary } from "./library.controller.js";

import Archetype from "../archetypes/archetype.model.js";
import Background from "../backgrounds/background.model.js";
import Condition from "../conditions/condition.model.js";
import Profession from "../professions/profession.model.js";
import Species from "../species/species.model.js";
import Trait from "../traits/trait.model.js";

vi.mock("../archetypes/archetype.model.js", () => ({
  default: { find: vi.fn() },
}));

vi.mock("../backgrounds/background.model.js", () => ({
  default: { find: vi.fn() },
}));

vi.mock("../conditions/condition.model.js", () => ({
  default: { find: vi.fn() },
}));

vi.mock("../professions/profession.model.js", () => ({
  default: { find: vi.fn() },
}));

vi.mock("../species/species.model.js", () => ({
  default: { find: vi.fn() },
}));

vi.mock("../traits/trait.model.js", () => ({
  default: { find: vi.fn() },
}));

describe("getLibrary", () => {
  let req;
  let res;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {};

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it("should fetch and return the entire library", async () => {
    const mockArchetypes = [{ name: "warrior" }];
    const mockBackgrounds = [{ name: "soldier" }];
    const mockConditions = [{ name: "poisoned" }];
    const mockProfessions = [{ name: "warrior" }];
    const mockSpecies = [{ name: "human" }];
    const mockTraits = [{ name: "strong" }];

    Archetype.find.mockResolvedValue(mockArchetypes);
    Background.find.mockResolvedValue(mockBackgrounds);
    Condition.find.mockResolvedValue(mockConditions);
    Profession.find.mockResolvedValue(mockProfessions);
    Species.find.mockResolvedValue(mockSpecies);
    Trait.find.mockResolvedValue(mockTraits);

    await getLibrary(req, res);

    expect(Archetype.find).toHaveBeenCalledWith({});
    expect(Background.find).toHaveBeenCalledWith({});
    expect(Condition.find).toHaveBeenCalledWith({});
    expect(Profession.find).toHaveBeenCalledWith({});
    expect(Species.find).toHaveBeenCalledWith({});
    expect(Trait.find).toHaveBeenCalledWith({});

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      archetypes: mockArchetypes,
      backgrounds: mockBackgrounds,
      conditions: mockConditions,
      professions: mockProfessions,
      species: mockSpecies,
      traits: mockTraits,
    });
  });

  it("should return a 500 error if fetching the library fails", async () => {
    const error = new Error("Database connection failed");

    Archetype.find.mockRejectedValue(error);
    Background.find.mockResolvedValue([]);
    Condition.find.mockResolvedValue([]);
    Profession.find.mockResolvedValue([]);
    Species.find.mockResolvedValue([]);
    Trait.find.mockResolvedValue([]);

    await getLibrary(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch library",
      error: "Database connection failed",
    });
  });
});
