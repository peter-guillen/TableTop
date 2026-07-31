import {
  PROFESSIONS,
  AFFINITIES,
  CONDITIONS,
  EFFECT_TYPES,
  DAMAGE_TYPES,
  OFFENSIVE_STATS,
  STATS,
  SKILLS,
} from "./constants.js";

export const getConstants = (req, res) => {
  res.json({
    PROFESSIONS,
    AFFINITIES,
    CONDITIONS,
    EFFECT_TYPES,
    DAMAGE_TYPES,
    OFFENSIVE_STATS,
    STATS,
    SKILLS,
  });
};
