import type {
  LevelReward,
  Properties,
  Skills,
  StatModifier,
} from "../../shared/constants/constantTypes";

// ARMOR in server/shared/constants/constants.js (only professions use it)
export type Armor = "light_armor" | "medium_armor" | "heavy_armor" | "unarmored";

export interface StartingItem {
  // Item id
  item: string;
  quantity: number;
}

// Mirrors server/domains/professions/profession.model.js
export interface Profession {
  _id?: string;
  name: string;
  description: string;

  statModifiers: StatModifier[];
  armorProficiencies: Armor[];
  weaponProficiencies: Properties[];
  skillProficiencies: Skills[];
  startingItems: StartingItem[];

  // One entry per level, 1 to MAX_LEVEL (the form saves every level)
  levelRewards: LevelReward[];
}
