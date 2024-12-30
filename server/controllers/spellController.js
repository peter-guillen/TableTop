const Spell = require("../models/spellModel");
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
  const { title, description, category } = req.body;
  try {
    const spell = await Spell.create({ title, description, category });
    res.status(200).json(spell);
  } catch (error) {
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

const updateSpell = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Spell Not Found!" });
  }
  const spell = await Spell.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!spell) {
    return res.status(400).json({ error: "Spell Not Found!" });
  }
  res.status(200).json(spell);
};

module.exports = { getSpells, getSpell, createSpell, deleteSpell, updateSpell };
