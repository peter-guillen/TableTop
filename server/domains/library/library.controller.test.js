import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLibrary } from "./library.controller.js";

import Affinity from "../affinities/affinity.model.js";
import Armor from "../armors/armor.model.js";
import Background from "../backgrounds/background.model.js";
import Condition from "../conditions/condition.model.js";
import Profession from "../professions/profession.model.js";
import Species from "../species/species.model.js";
import Spell from "../spells/spell.model.js";
import Trait from "../traits/trait.model.js";
import Weapon from "../weapons/weapon.model.js";

vi.mock("../affinities/affinity.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../armors/armor.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../backgrounds/background.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../conditions/condition.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../professions/profession.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../species/species.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../spells/spell.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../traits/trait.model.js", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../weapons/weapon.model.js", () => ({
  default: {
    find: vi.fn(),
  },
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
    const mockAffinities = [{ name: "Fire" }];
    const mockArmors = [{ name: "Plate Armor" }];
    const mockBackgrounds = [{ name: "Noble" }];
    const mockConditions = [{ name: "Poisoned" }];
    const mockProfessions = [{ name: "Blacksmith" }];
    const mockSpecies = [{ name: "Human" }];
    const mockSpells = [{ name: "Fireball" }];
    const mockTraits = [{ name: "Strong" }];
    const mockWeapons = [{ name: "Longsword" }];

    Affinity.find.mockResolvedValue(mockAffinities);
    Armor.find.mockResolvedValue(mockArmors);
    Background.find.mockResolvedValue(mockBackgrounds);
    Condition.find.mockResolvedValue(mockConditions);
    Profession.find.mockResolvedValue(mockProfessions);
    Species.find.mockResolvedValue(mockSpecies);
    Spell.find.mockResolvedValue(mockSpells);
    Trait.find.mockResolvedValue(mockTraits);
    Weapon.find.mockResolvedValue(mockWeapons);

    await getLibrary(req, res);

    expect(Affinity.find).toHaveBeenCalledWith({});
    expect(Armor.find).toHaveBeenCalledWith({});
    expect(Background.find).toHaveBeenCalledWith({});
    expect(Condition.find).toHaveBeenCalledWith({});
    expect(Profession.find).toHaveBeenCalledWith({});
    expect(Species.find).toHaveBeenCalledWith({});
    expect(Spell.find).toHaveBeenCalledWith({});
    expect(Trait.find).toHaveBeenCalledWith({});
    expect(Weapon.find).toHaveBeenCalledWith({});

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      affinities: mockAffinities,
      armors: mockArmors,
      backgrounds: mockBackgrounds,
      conditions: mockConditions,
      professions: mockProfessions,
      species: mockSpecies,
      spells: mockSpells,
      traits: mockTraits,
      weapons: mockWeapons,
    });
  });

  it("should return a 500 error if fetching the library fails", async () => {
    const error = new Error("Database connection failed");

    Affinity.find.mockRejectedValue(error);
    Armor.find.mockResolvedValue([]);
    Background.find.mockResolvedValue([]);
    Condition.find.mockResolvedValue([]);
    Profession.find.mockResolvedValue([]);
    Species.find.mockResolvedValue([]);
    Spell.find.mockResolvedValue([]);
    Trait.find.mockResolvedValue([]);
    Weapon.find.mockResolvedValue([]);

    await getLibrary(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch library",
      error: "Database connection failed",
    });
  });
});
