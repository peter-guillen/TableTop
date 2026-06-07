import mongoose from "mongoose";
import Affinity from "../affinities/affinity.model.js";
import Armor from "../armors/armor.model.js";
import Background from "../backgrounds/background.model.js";
import Profession from "../professions/profession.model.js";
import Species from "../species/species.model.js";
import Spell from "../spells/spell.model.js";
import Trait from "../traits/trait.model.js";
import Weapon from "../weapons/weapon.model.js";

const getLibrary = async (req, res) => {
  try {
    const [
      affinities,
      armors,
      backgrounds,
      professions,
      species,
      spells,
      traits,
      weapons,
    ] = await Promise.all([
      Affinity.find({}),
      Armor.find({}),
      Background.find({}),
      Profession.find({}),
      Species.find({}),
      Spell.find({}),
      Trait.find({}),
      Weapon.find({}),
    ]);
    res.status(200).json({
      affinities,
      armors,
      backgrounds,
      professions,
      species,
      spells,
      traits,
      weapons,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch library", error: error.message });
  }
};

export { getLibrary };
