const mongoose = require("mongoose");
const Affinity = require("../models/AffinityModel");
const Armor = require("../models/ArmorModel");
const Background = require("../models/BackgroundModel");
const Profession = require("../models/ProfessionModel");
const Species = require("../models/SpeciesModel");
const Spell = require("../models/SpellModel");
const Trait = require("../models/TraitModel");
const Weapon = require("../models/WeaponModel");

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

module.exports = { getLibrary };
