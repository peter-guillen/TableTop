import {
  PROFESSIONS,
  AFFINITIES,
  CONDITIONS,
  STATS,
  SKILLS,
} from "./constants.js";

export const getConstants = (req, res) => {
  res.json({ PROFESSIONS, AFFINITIES, CONDITIONS, STATS, SKILLS });
};
