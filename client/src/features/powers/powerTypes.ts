export type PowerKind = "spell" | "ability" | "technique" | "trait";

export type SpellSchool =
  | "evocation"
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "illusion"
  | "necromancy"
  | "transmutation";

export type EffectType =
  | "damage"
  | "healing"
  | "buff"
  | "debuff"
  | "control"
  | "utility"
  | "summon";

export type Recharge = "unlimited" | "short_rest" | "long_rest" | "daily";

export type OffensiveStat = "Might" | "Accuracy" | "Dominance";

/* ------------------------------ Targeting ------------------------------ */
export type TargetCategory = "creature" | "object" | "point";

export type TargetShape =
  | "sphere"
  | "cone"
  | "line"
  | "cube"
  | "wall"
  | "cylinder";
export interface Targeting {
  targetCategory: TargetCategory;
  targetCount: number;
  range: number;
  shape?: TargetShape;
  size?: number;
}

/* ------------------------------ HealthEffect ------------------------------ */
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

export interface HealthEffect {
  direction: "damage" | "healing";
  damageType?: string;
  diceSize?: number;
  diceCount?: number;
  flat?: number;
  persistent: boolean;
  durationType?: "turns" | "until_broken" | "permanent";
  duration?: number;

  /* ------------------------------ StatModifier ------------------------------ */
}
export interface StatModifier {
  stat: string;
  value: number;
  durationType: "turns" | "until_broken" | "permanent";
  duration?: number;
  target: string;
  description: string;
}

/* ------------------------------ Condition ------------------------------ */

export interface Condition {
  condition: string;
  durationType: "turns" | "until_broken" | "permanent";
  duration?: number;
}

/* ------------------------------ Activation ------------------------------ */

export type Action = "major_action" | "minor_action" | "reaction";

export type Resource = "hp" | "mp" | "momentum";

export interface Activation {
  action: Action;
  ritual: boolean;
  concentration: boolean;
  channel: boolean;
  castTime: number;
  duration: number;
  resource: Resource;
  cost: number;
}

/* ------------------------------ Requirements ------------------------------ */
export interface Requirements {
  minLevel: number;
  requiredTraits: string[];
  weaponTags: [];
}

export interface Power {
  _id?: string;
  name: string;
  kind: PowerKind;
  description: string;
  school?: SpellSchool;
  // tier: number;

  effectType: EffectType[];
  damageType?: DamageType[];

  healthEffects: HealthEffect[];
  statModifiers: StatModifier[];
  conditions: Condition[];

  activation: Activation;
  recharge: Recharge;
  targeting: Targeting;
  offensiveStat: OffensiveStat;

  requirements: Requirements;
  grantedPowers: string[];
}
