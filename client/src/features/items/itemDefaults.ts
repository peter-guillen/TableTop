import { Item } from "./itemTypes";

export const defaultItemFormData: Item = {
  name: "",
  description: "",
  category: "",
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
};
