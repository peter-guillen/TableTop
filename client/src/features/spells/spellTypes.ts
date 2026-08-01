import {
  EffectType,
  DamageType,
  HealthEffect,
  StatModifier,
  OffensiveStat,
} from "../../shared/constants/constantTypes";

export interface SpellCondition {
  condition: string;
  durationType: "turns" | "until_broken" | "permanent";
  duration?: number;
}

export type SpellSchool =
  | "evocation"
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "illusion"
  | "necromancy"
  | "transmutation";

export type CastingAction = "major_action" | "minor_action" | "reaction";

export type Recharge = "unlimited" | "short_rest" | "long_rest" | "daily";

export type TargetCategory = "creature" | "object" | "point";

export type TargetShape =
  | "sphere"
  | "cone"
  | "line"
  | "cube"
  | "wall"
  | "cylinder";

export interface Casting {
  action: CastingAction;
  ritual: boolean;
  concentration: boolean;
  channel: boolean;
  castTime: number;
  duration: number;
  stamina?: number;
}

export interface Targeting {
  targetCategory: TargetCategory;
  targetCount: number;
  range: number;
  shape?: TargetShape;
  size?: number;
}

export interface Spell {
  _id?: string;
  name: string;
  school: SpellSchool;
  tier: number;

  effectType: EffectType[];
  damageType: DamageType[];

  healthEffects: HealthEffect[];
  statModifiers: StatModifier[];
  conditions: SpellCondition[];

  casting: Casting;
  recharge: Recharge;
  targeting: Targeting;

  offensiveStat: OffensiveStat;

  description: string;
}
