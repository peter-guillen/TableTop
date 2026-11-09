import type {
  HealthEffect,
  Resistance,
  Properties,
  Skills,
  StatModifier as SharedStatModifier,
} from "../../shared/constants/constantTypes";

export type Category =
  | "weapon"
  | "armor"
  | "accessory"
  | "trinket"
  | "consumable";

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
  | "enchanted"
  | "blessed"
  | "cursed"
  | "divine"
  | "masterwork"
  | "runed"
  | "corrupted"
  | "sentient"
  | "unstable"
  | "ancestral"
  | "forbidden"
  | "relic";

export type Recharge =
  | "unlimited"
  | "none"
  | "short_rest"
  | "long_rest"
  | "daily";

export type GrantedPowerRecharge = "unlimited" | Recharge;

export type Handedness =
  | "one_handed"
  | "two_handed"
  | "main_hand_only"
  | "off_hand_only"
  | "versatile";

// Item stat modifiers can target a skill as well as a stat
export type StatModifier = Omit<SharedStatModifier, "stat"> & {
  stat: SharedStatModifier["stat"] | Skills;
};

export interface GrantedPower {
  power: string;
  recharge: GrantedPowerRecharge;
  usesPerRecharge?: number;
}

export interface SelfCharges {
  usesRemaining?: number;
  recharge: Exclude<Recharge, "unlimited">;
}

export interface Requirements {
  minLevel?: number;
  requiredTraits: string[];
}

export interface Item {
  _id?: string;
  name: string;
  description: string;

  category: Category | "";
  handedness?: Handedness;

  rarity: Rarity | "";
  quality: Quality[];
  materials: Materials[];
  properties: Properties[];
  value: number;

  healthEffects: HealthEffect[];
  statModifiers: StatModifier[];
  resistances: Resistance[];
  grantedPowers: GrantedPower[];

  selfCharges: SelfCharges;
  uniqueSkills: string[];

  requirements?: Requirements;

  createdAt?: string;
  updatedAt?: string;
}
