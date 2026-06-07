import mongoose from "mongoose";
import Spell from "./spell.model.js";
import * as spellService from "./spell.service.js";

const getAllSpells = async (req, res) => {
  try {
    const spells = await spellService.getAllSpells();
    res.status(200).json(spells);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSpellById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Spell ID" });
  }
  try {
    const spell = await spellService.getSpellById(id);
    if (!spell) {
      return res.status(404).json({ error: "Spell Not Found!" });
    }
    res.status(200).json(spell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSpell = async (req, res, next) => {
  try {
    const spell = await spellService.createSpell(req.body, req.user._id);
    res.status(201).json(spell);
  } catch (error) {
    next(error);
  }
};

const updateSpell = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Spell ID" });
  }
  try {
    const spell = await spellService.updateSpell(id, req.body, req.user._id);
    if (!spell) {
      return res.status(404).json({ error: "Spell Not Found!" });
    }
    res.status(200).json(spell);
  } catch (error) {
    next(error);
  }
};

const deleteSpell = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Spell ID" });
  }
  try {
    const spell = await spellService.deleteSpell(id, req.user._id);
    if (!spell) {
      return res.status(404).json({ error: "Spell Not Found!" });
    }
    res.status(200).json(spell);
  } catch (error) {
    next(error);
  }
};

export { getAllSpells, getSpellById, createSpell, updateSpell, deleteSpell };
