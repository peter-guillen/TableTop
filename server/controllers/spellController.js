const Spell = require("../models/SpellModel");
const mongoose = require("mongoose");

const getSpells = async (req, res) => {
  const spells = await Spell.find({});
  res.status(200).json(spells);
};

const getSpell = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Spell Not Found!" });
  }
  const spell = await Spell.findById(id);
  if (!spell) {
    return res.status(404).json({ error: "Spell Not Found!" });
  }
  res.status(200).json(spell);
};

const createSpell = async (req, res) => {
  const {
    name,
    school,
    tier,
    element,
    tags,
    castingTime,
    isRitual,
    stamina,
    usesPerDay,
    range,
    area,
    target,
    attackType,
    duration,
    requiresConcentration,
    damage,
    healing,
    conditions,
    buffs,
    debuffs,
    description,
  } = req.body;
  try {
    const spell = await Spell.create({
      name,
      school,
      tier,
      element,
      tags,
      castingTime,
      isRitual,
      stamina,
      usesPerDay,
      range,
      area,
      target,
      attackType,
      duration,
      requiresConcentration,
      damage,
      healing,
      conditions,
      buffs,
      debuffs,
      description,
    });
    res.status(200).json(spell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSpell = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Spell ID" });
  }
  try {
    const spell = await Spell.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!spell) {
      return res.status(404).json({ error: "Spell Not Found!" });
    }
    res.status(200).json(spell);
  } catch (error) {
    console.error("Error updating spell:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteSpell = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Spell Not Found!" });
  }
  const spell = await Spell.findByIdAndDelete(id);
  if (!spell) {
    res.status(400).json({ error: "Spell Not Found!" });
  }
  res.status(200).json(spell);
};

module.exports = { getSpells, getSpell, createSpell, updateSpell, deleteSpell };
