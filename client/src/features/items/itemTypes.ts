export type Category =
  | "weapon"
  | "armor"
  | "accessory"
  | "trinket"
  | "consumable";

export type Rarity =
  | "common"
  | "rare"
  | "heroic"
  | "epic"
  | "legendary"
  | "mythic";

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

export type Material =
  | "silvered"
  | "adamantine"
  | "steel"
  | "iron"
  | "mithril"
  | "orichalcum";

export type Property =
  | "finesse"
  | "heavy"
  | "light"
  | "reach"
  | "thrown"
  | "one-handed"
  | "two-handed"
  | "versatile";

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

export type ItemCategory =
  | "weapon"
  | "armor"
  | "accessory"
  | "consumable"
  | "trinket";

export type Stat = "";

export type Skill = "";

export type DurationType = "turns" | "until_broken" | "permanent";

export type Recharge = "none" | "short_rest" | "long_rest" | "daily";
export type GrantedPowerRecharge = "unlimited" | Recharge;

export interface HealthEffect {
  direction: "damage" | "healing" | "";
  damageType: DamageType | "";
  diceSize: number;
  diceCount: number;
  flat: number;
  persistent: boolean;
  durationType?: DurationType | "";
  duration?: number;
}

export interface StatModifier {
  stat: Stat | Skill | "";
  value: number;
  durationType?: DurationType | "";
  duration?: number;
  target?: string;
  description?: string;
}

export interface Resistance {
  damageType: DamageType | "";
  rule: "resistance" | "vulnerability" | "immunity" | "absorption" | "";
}

export interface GrantedPower {
  power: string; // Power _id ref
  recharge: GrantedPowerRecharge;
  usesPerRecharge?: number;
}

export interface SelfCharges {
  usesRemaining?: number;
  recharge: Recharge;
}

export interface Item {
  _id?: string;
  name: string;
  description: string;
  category: ItemCategory | "";
  rarity: Rarity | "";
  quality: Quality[];
  materials: Material[];
  properties: Property[];
  value: number;
  healthEffects: HealthEffect[];
  statModifiers: StatModifier[];
  resistances: Resistance[];
  grantedPowers: GrantedPower[];
  selfCharges: SelfCharges;
  uniqueSkills: string[];
}
