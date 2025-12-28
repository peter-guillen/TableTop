const Spell = require("../models/SpellModel");
const mongoose = require("mongoose");
const { logAction } = require("../utils/logger");

// Get all spells
const getSpells = async (req, res) => {
  // The lean() method greatly reduces size and turns the data into a JSON objects
  const spells = await Spell.find({}).lean();
  res.status(200).json(spells);
};

// Get a single spell
const getSpell = async (req, res) => {
  const { id } = req.params;
  // Verify that the data is a valid type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid spell type!" });
  }
  // Find the spell by its ID in the database
  const spell = await Spell.findById(id).lean();
  // Verify the spell exists
  if (!spell) {
    return res.status(404).json({ error: "Spell Not Found!" });
  }
  res.status(200).json(spell);
};

const createSpell = async (req, res) => {
  try {
    const spell = await Spell.create(req.body);
    // Create a log when creating a new spell
    await logAction({
      userId: req.user._id,
      action: "Created Spell",
      target: "Spell",
      targetId: spell._id,
      metadata: {
        before: null,
        after: spell.toObject(),
      },
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
    const before = await Spell.findById(id).lean();
    if (!before) {
      return res.status(404).json({ error: "Spell Not Found!" });
    }
    const after = await Spell.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    ).lean();
    await logAction({
      userId: req.user._id,
      action: "Updated Spell",
      target: "Spell",
      targetId: after._id,
      metadata: {
        before,
        after,
      },
    });

    res.status(200).json(after);
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
  try {
    const before = await Spell.findById(id).lean();
    if (!before) {
      return res.status(404).json({ error: "Spell Not Found!" });
    }
    await Spell.findByIdAndDelete(id);
    await logAction({
      userId: req.user._id,
      action: "Deleted Spell",
      target: "Spell",
      targetId: before._id,
      metadata: {
        before,
        after: null,
      },
    });
    res.status(200).json(before);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getSpells, getSpell, createSpell, updateSpell, deleteSpell };
