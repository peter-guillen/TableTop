import {
  PROFESSIONS,
  AFFINITIES,
  CONDITIONS,
  EFFECT_TYPES,
  DAMAGE_TYPES,
  STATS,
  OFFENSIVE_STATS,
  SKILLS,
  RARITY,
  QUALITY,
  MATERIALS,
  PROPERTIES,
} from "./constants.js";

export const getConstants = (req, res) => {
  res.json({
    PROFESSIONS,
    AFFINITIES,
    CONDITIONS,
    EFFECT_TYPES,
    DAMAGE_TYPES,
    STATS,
    OFFENSIVE_STATS,
    SKILLS,
    RARITY,
    QUALITY,
    MATERIALS,
    PROPERTIES,
  });
};
