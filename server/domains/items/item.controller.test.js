import { describe, it, expect, vi } from "vitest";

vi.mock("../../shared/constants/constants.js", () => ({
  STATS: { MIGHT: "might", RESILIENCE: "resilience" },
  SKILLS: { STEALTH: "stealth", ATHLETICS: "athletics" },
  PROPERTIES: ["finesse", "heavy", "thrown"],
  DAMAGE_TYPES: ["fire", "slashing", "piercing"],
  RARITY: ["common", "rare", "legendary"],
  QUALITY: ["poor", "standard", "masterwork"],
  MATERIALS: ["steel", "wood", "leather"],
}));

import Item from "./item.model.js";

describe("Item schema", () => {
  it("validates a fully-populated valid item with no errors", () => {
    const item = new Item({
      name: "Flask of Endless Tears",
      description: "A trinket that never runs dry.",
      category: "trinket",
      rarity: "legendary",
      quality: ["masterwork"],
      materials: ["steel"],
      properties: ["thrown"],
      value: 500,
      healthEffects: [
        {
          direction: "healing",
          damageType: "fire",
          diceSize: 6,
          diceCount: 2,
          flat: 0,
          persistent: false,
          durationType: "turns",
          duration: 3,
        },
      ],
      statModifiers: [
        {
          stat: "might",
          value: 2,
          durationType: "permanent",
        },
      ],
      resistances: [{ damageType: "fire", rule: "resistance" }],
      grantedItems: [{ recharge: "long_rest", usesPerRecharge: 1 }],
      selfCharges: { usesRemaining: 3, recharge: "daily" },
      uniqueSkills: ["Tear Sight"],
    });

    const err = item.validateSync();
    expect(err).toBeUndefined();
  });

  it("requires name, description, and category", () => {
    const item = new Item({});
    const err = item.validateSync();

    expect(err.errors.name).toBeDefined();
    expect(err.errors.description).toBeDefined();
    expect(err.errors.category).toBeDefined();
  });

  it("rejects an invalid category", () => {
    const item = new Item({
      name: "Bad Item",
      description: "desc",
      category: "not-a-real-category",
    });
    const err = item.validateSync();

    expect(err.errors.category).toBeDefined();
  });

  it("rejects invalid rarity, quality, and materials values", () => {
    const item = new Item({
      name: "Bad Enums",
      description: "desc",
      category: "weapon",
      rarity: "mythical", // not in mocked RARITY
      quality: ["cursd"], // not in mocked QUALITY
      materials: ["adamantium"], // not in mocked MATERIALS
    });
    const err = item.validateSync();

    expect(err.errors.rarity).toBeDefined();
    expect(err.errors["quality.0"]).toBeDefined();
    expect(err.errors["materials.0"]).toBeDefined();
  });

  it("requires stat and value on statModifiers entries", () => {
    const item = new Item({
      name: "Ring of Nothing",
      description: "desc",
      category: "accessory",
      statModifiers: [{ durationType: "turns" }],
    });
    const err = item.validateSync();

    expect(err.errors["statModifiers.0.stat"]).toBeDefined();
    expect(err.errors["statModifiers.0.value"]).toBeDefined();
  });

  it("accepts a SKILLS value (not just STATS) on statModifiers.stat", () => {
    const item = new Item({
      name: "Cloak of Shadows",
      description: "desc",
      category: "accessory",
      statModifiers: [{ stat: "stealth", value: 3 }],
    });
    const err = item.validateSync();

    expect(err).toBeUndefined();
  });

  it("requires damageType and rule on resistances entries", () => {
    const item = new Item({
      name: "Broken Ward",
      description: "desc",
      category: "trinket",
      resistances: [{}],
    });
    const err = item.validateSync();

    expect(err.errors["resistances.0.damageType"]).toBeDefined();
    expect(err.errors["resistances.0.rule"]).toBeDefined();
  });

  it("rejects an invalid resistances.rule value", () => {
    const item = new Item({
      name: "Broken Ward",
      description: "desc",
      category: "trinket",
      resistances: [{ damageType: "fire", rule: "reflection" }],
    });
    const err = item.validateSync();

    expect(err.errors["resistances.0.rule"]).toBeDefined();
  });

  it("rejects an invalid grantedItems.recharge value", () => {
    const item = new Item({
      name: "Wand of Sparks",
      description: "desc",
      category: "weapon",
      grantedItems: [{ recharge: "hourly" }],
    });
    const err = item.validateSync();

    expect(err.errors["grantedItems.0.recharge"]).toBeDefined();
  });

  it("rejects 'unlimited' on selfCharges.recharge (only valid on grantedItems)", () => {
    const item = new Item({
      name: "Flask of Endless Tears",
      description: "desc",
      category: "trinket",
      selfCharges: { usesRemaining: 1, recharge: "unlimited" },
    });
    const err = item.validateSync();

    expect(err.errors["selfCharges.recharge"]).toBeDefined();
  });

  it("has timestamps enabled on the schema", () => {
    expect(Item.schema.options.timestamps).toBe(true);
  });
});
