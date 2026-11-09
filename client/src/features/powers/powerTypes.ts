import type {
  DurationType,
  HealthEffect,
  StatModifier,
} from "../../shared/constants/constantTypes";

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

export type OffensiveStat = "might" | "accuracy" | "dominance";

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

/* ------------------------------ Condition ------------------------------ */

export interface Condition {
  condition: string;
  durationType: DurationType;
  duration?: number;
}

/* ------------------------------ Activation ------------------------------ */

export type Action = "major_action" | "minor_action" | "reaction";

export type Resource = "hp" | "mp";

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
  minLevel?: number;
  requiredTraits?: string[];
  properties?: string[];
}

export interface Power {
  _id?: string;
  name: string;
  kind: PowerKind;
  description: string;
  school?: SpellSchool;
  effectType?: EffectType;

  healthEffects: HealthEffect[];
  statModifiers: StatModifier[];
  conditions: Condition[];

  activation: Activation;
  recharge: Recharge;
  targeting: Targeting;
  offensiveStat: OffensiveStat;

  requirements: Requirements;
  grantedPowers: string[];

  createdAt?: string;
  updatedAt?: string;
}
