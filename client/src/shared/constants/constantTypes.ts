export type EffectType =
  | "damage"
  | "healing"
  | "buff"
  | "debuff"
  | "control"
  | "utility"
  | "summon";

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

export type OffensiveStat = "might" | "accuracy" | "dominance";

export interface StatModifier {
  stat: string;
  value: number;
  durationType: "turns" | "until_broken" | "permanent";
  duration?: number;
  target: string;
  description: string;
}

export interface HealthEffect {
  direction: "damage" | "healing";
  diceSize?: number;
  diceCount?: number;
  flat?: number;
  persistent: boolean;
  durationType?: "turns" | "until_broken" | "permanent";
  duration?: number;
}

export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "heroic"
  | "epic"
  | "legendary"
  | "mythic";

export type Materials =
  | "silvered"
  | "adamantine"
  | "steel"
  | "iron"
  | "mithril"
  | "orichalcum"
  | "dragonscale"
  | "bone"
  | "silver";

export type Quality =
  | "Enchanted"
  | "Blessed"
  | "Cursed"
  | "Divine"
  | "Masterwork"
  | "Runed"
  | "Corrupted"
  | "Sentient"
  | "Unstable"
  | "Ancestral"
  | "Forbidden"
  | "Relic";

export type Properties =
  | "finesse"
  | "heavy"
  | "light"
  | "reach"
  | "thrown"
  | "one-handed"
  | "two-handed"
  | "versatile";

export type Profession =
  | "Warrior"
  | "Knight"
  | "Rogue"
  | "Ranger"
  | "Paladin"
  | "Warlock"
  | "Witch"
  | "Wizard"
  | "Sorcerer"
  | "Magician"
  | "Summoner"
  | "Psychic";

export type Background =
  | "Soldier"
  | "Sage"
  | "Scholar"
  | "Thief"
  | "Acolyte"
  | "Mercenary"
  | "Adeventurer";

export type Traits =
  | "Steady"
  | "Fast & Furious"
  | "Unshakeable"
  | "Super Strong"
  | "Patient";

export type Species =
  | "Human"
  | "Dwarf"
  | "Elf"
  | "Orc"
  | "Naga"
  | "Werewolf"
  | "Vampire";

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

export interface StatCategory {
  label: string;
  stats: Stats[];
}

export type Armor =
  | "Light Armor"
  | "Medium Armor"
  | "Heavy Armor"
  | "Unarmored";

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

export interface Constants {
  PROFESSIONS: string[];

  STATS: Record<string, string>;
  OFFENSIVE_STATS: OffensiveStat[];
  STAT_CATEGORIES: Record<
    "OFFENSIVE" | "DEFENSIVE" | "MOBILITY" | "RESOURCES",
    StatCategory
  >;

  DAMAGE_TYPES: DamageType[];
  SKILLS: Record<string, Skills>;

  RARITY: Rarity;
  QUALITY: Quality[];
  MATERIALS: Materials[];

  PROPERTIES: Properties[];

  MAX_LEVEL: number;
  CLASSLESS_LEVEL_REWARDS: LevelReward[];
}
