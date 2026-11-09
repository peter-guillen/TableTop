// Types shared by more than one domain. They mirror
// server/shared/constants/constants.js and the sub-documents several models
// repeat. Types used by only one domain live in that domain's <x>Types.ts.
import type { Rarity, Quality, Materials } from "../../features/items/itemTypes";
import type { OffensiveStat } from "../../features/powers/powerTypes";

export type DamageType =
  | "slashing"
  | "piercing"
  | "bludgeoning"
  | "fire"
  | "water"
  | "air"
  | "earth"
  | "light"
  | "dark"
  | "force"
  | "psychic"
  | "poison"
  | "acid"
  | "radiant"
  | "necrotic";

export type DurationType = "turns" | "until_broken" | "permanent";

// Weapon properties: item properties, technique requirements,
// profession weapon proficiencies
export type Properties =
  | "finesse"
  | "heavy"
  | "light"
  | "reach"
  | "thrown"
  | "one-handed"
  | "two-handed"
  | "versatile";

export type Skills =
  | "acrobatics"
  | "arcana"
  | "athletics"
  | "crafting"
  | "deception"
  | "endurance"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "larceny"
  | "stealth"
  | "survival"
  | "tactics"
  | "taming"
  | "warfare";

export type Stats =
  | "might"
  | "accuracy"
  | "dominance"
  | "evasion"
  | "resolve"
  | "resilience"
  | "movement"
  | "initiative"
  | "hp"
  | "hpMax"
  | "mp"
  | "mpMax"
  | "mom"
  | "momMax";

// statModifiers[] on powers, species, backgrounds and professions.
// Items widen `stat` to skills too (see itemTypes.ts).
// "" is the form's "nothing picked yet" value.
export interface StatModifier {
  stat: Stats | "";
  value: number;
  durationType?: DurationType | "";
  duration?: number;
  target?: string;
  description?: string;
}

// healthEffects[] on powers and items
export interface HealthEffect {
  direction: "damage" | "healing";
  damageType?: DamageType | "";
  diceSize?: number;
  diceCount?: number;
  flat?: number;
  persistent: boolean;
  durationType?: DurationType | "";
  duration?: number;
}

export type ResistanceRule =
  | "resistance"
  | "vulnerability"
  | "immunity"
  | "absorption";

// resistances[] on species and items
export interface Resistance {
  damageType: DamageType | "";
  rule: ResistanceRule | "";
}

export interface StatCategory {
  label: string;
  stats: Stats[];
}

export type PowerGroup = "spells" | "abilities" | "traits";

export interface LevelGrant {
  type: "auto" | "professionChoice" | "playerChoice";
  trait?: string;
  options?: string[];
}

export interface LevelReward {
  level: number;
  grants: LevelGrant[];
  statIncreases?: { stat: Stats; value: number }[];
  slotIncreases?: { group: PowerGroup; value: number }[];
}

// Response of GET /api/constants (server/shared/constants/constants.controller.js)
export interface Constants {
  PROFESSIONS: string[];

  STATS: Record<string, Stats>;
  OFFENSIVE_STATS: OffensiveStat[];
  STAT_CATEGORIES: Record<
    "OFFENSIVE" | "DEFENSIVE" | "MOBILITY" | "RESOURCES",
    StatCategory
  >;

  DAMAGE_TYPES: DamageType[];
  SKILLS: Record<string, Skills>;

  RARITY: Rarity[];
  QUALITY: Quality[];
  MATERIALS: Materials[];

  PROPERTIES: Properties[];

  MAX_LEVEL: number;
  CLASSLESS_LEVEL_REWARDS: LevelReward[];
}
