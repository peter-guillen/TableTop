import { Item } from "./itemTypes";

export const defaultItemFormData: Item = {
  name: "",
  description: "",
  category: "",
  handedness: "one_handed",
  rarity: "",
  quality: [],
  materials: [],
  properties: [],
  value: 0,
  healthEffects: [],
  statModifiers: [],
  resistances: [],
  grantedPowers: [],
  selfCharges: {
    usesRemaining: 0,
    recharge: "none",
  },
  uniqueSkills: [],
  requirements: {
    minLevel: 1,
    requiredTraits: [],
  },
};
