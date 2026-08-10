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

export type OffensiveStat = "Might" | "Accuracy" | "Dominance";

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
  | "orichalcum";

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
