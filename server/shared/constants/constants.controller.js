import {
  PROFESSIONS,
  DAMAGE_TYPES,
  STATS,
  OFFENSIVE_STATS,
  STAT_CATEGORIES,
  SKILLS,
  RARITY,
  QUALITY,
  MATERIALS,
  PROPERTIES,
  MAX_LEVEL,
  CLASSLESS_LEVEL_REWARDS,
} from "./constants.js";

export const getConstants = (req, res) => {
  // The client renders these as lists, so send their values as arrays.
  // STATS and SKILLS stay as objects (the client reads them with Object.values).
  res.json({
    PROFESSIONS,
    DAMAGE_TYPES: Object.values(DAMAGE_TYPES),
    STATS,
    OFFENSIVE_STATS,
    STAT_CATEGORIES,
    SKILLS,
    RARITY: Object.values(RARITY),
    QUALITY: Object.values(QUALITY),
    MATERIALS: Object.values(MATERIALS),
    PROPERTIES: Object.values(PROPERTIES),
    MAX_LEVEL,
    CLASSLESS_LEVEL_REWARDS,
  });
};
