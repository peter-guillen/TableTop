import { DiceRoll } from "../library/constantTypes";

export type Rarity =
  | "common"
  | "rare"
  | "heroic"
  | "epic"
  | "legendary"
  | "mythic";

export type Properties =
  | "ammunition"
  | "finesse"
  | "heavy"
  | "light"
  | "loading"
  | "reach"
  | "special"
  | "thrown"
  | "two-handed"
  | "versatile"
  | "silvered"
  | "adamantine"
  | "magical";

export type Category =
  | "simple"
  | "martial"
  | "exotic"
  | "firearm"
  | "ammunition";

export type DamageType =
  | "slashing"
  | "piercing"
  | "bludgeoning"
  | "fire"
  | "cold"
  | "lightning"
  | "acid"
  | "poison"
  | "radiant"
  | "necrotic"
  | "force"
  | "psychic"
  | "thunder";

export interface Requirements {
  strength: number;
  proficiency: string[];
  level: number;
}

export interface Weapon {
  name: string;
  category: Category;
  rarity: Rarity;
  weight?: number;
  value?: number;
  damage: DiceRoll[];
  damageType?: DamageType;
  range?: string;
  properties: Properties[];
  requirements: Requirements;
  skills: string[];
  special?: string;
  description: string;
  tags: string[];
}
