export interface DiceRoll {
  diceCount: number;
  diceSize: number;
  modifier: number;
}

export type EffectType =
  | "damage"
  | "healing"
  | "buff"
  | "debuff"
  | "control"
  | "utility"
  | "summon";

export type DamageType = "fire" | "water" | "air" | "earth" | "light" | "dark";

export type OffensiveStat = "Might" | "Accuracy" | "Dominance";

export interface StatModifier {
  stat: string;
  value: number;
  duration: string;
  target: string;
  description: string;
}

export interface HealthEffect {
  direction: "damage" | "healing";
  diceSize?: number;
  diceCount?: number;
  flat?: number;
  persistent: boolean;
  duration?: number;
}
