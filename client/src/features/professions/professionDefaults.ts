import { Profession } from "./professionTypes";

export const defaultProfessionFormData: Profession = {
  // Basic Info
  name: "",

  // Stats
  statModifiers: [],

  // Proficiencies & Equipment
  armorProficiencies: [],
  weaponProficiencies: [],
  skillProficiencies: [],
  startingItems: [],

  // Level rewards. Empty here; the form fills in levels 1 to MAX_LEVEL
  // (MAX_LEVEL comes from /api/constants at runtime)
  levelRewards: [],

  // Description
  description: "",
};
