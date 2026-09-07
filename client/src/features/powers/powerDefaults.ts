import {
  Power,
  Activation,
  Targeting,
  Condition,
  Requirements,
} from "./powerTypes";

export const defaultCondition: Condition = {
  condition: "",
  durationType: "turns",
  duration: 0,
};

export const defaultActivation: Activation = {
  action: "major_action",
  ritual: false,
  concentration: false,
  channel: false,
  castTime: 0,
  duration: 0,
  resource: "mp",
  cost: 0,
};

export const defaultTargeting: Targeting = {
  targetCategory: "creature",
  targetCount: 0,
  range: 0,
  shape: "sphere",
  size: 0,
};

export const defaultRequirements: Requirements = {
  minLevel: 1,
  requiredTraits: [],
  weaponTags: [],
};

export const defaultPowerFormData: Power = {
  name: "",
  kind: "spell",
  description: "",
  school: "evocation",

  // tier: 1,
  // domain: "",
  effectType: [],
  damageType: [],

  healthEffects: [],
  statModifiers: [],
  conditions: [],

  activation: defaultActivation,
  recharge: "unlimited",
  targeting: defaultTargeting,
  offensiveStat: "Might",

  requirements: defaultRequirements,
  grantedPowers: [],
};
