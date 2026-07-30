import { Spell, Casting, Targeting, SpellCondition } from "./spellTypes";

export const defaultSpellCondition: SpellCondition = {
  condition: "",
  durationType: "turns",
  duration: 0,
};

export const defaultCasting: Casting = {
  action: "major_action",
  ritual: false,
  concentration: false,
  channel: false,
  castTime: 0,
  duration: 0,
  stamina: 0,
};

export const defaultTargeting: Targeting = {
  targetCategory: "creature",
  targetCount: 0,
  range: 0,
  shape: "sphere",
  size: 0,
};

export const defaultSpellFormData: Spell = {
  // Basic Info
  name: "",
  school: "evocation",
  tier: 1,
  // domain: "",
  effectType: [],
  damageType: [],

  // Casting
  healthEffects: [],
  statModifiers: [],
  conditions: [],

  casting: defaultCasting,
  recharge: "unlimited",
  targeting: defaultTargeting,

  offensiveStat: "Might",

  // Description
  description: "",
};
