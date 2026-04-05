const mongoose = require("mongoose");
const Armor = require("../models/ArmorModel");
const Spell = require("../models/SpellModel");
const Weapon = require("../models/WeaponModel");
const Profession = require("../models/ProfessionModel");

const getLibrary = async (req, res) => {
  try {
    const [armors, spells, weapons, professions] = await Promise.all([
      Armor.find({}),
      Spell.find({}),
      Weapon.find({}),
      Profession.find({}),
    ]);
    res.status(200).json({ armors, spells, weapons, professions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch library", error: error.message });
  }
};

module.exports = { getLibrary };
