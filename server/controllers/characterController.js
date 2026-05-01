const Character = require("../models/CharacterModel");
const mongoose = require("mongoose");
const { logAction } = require("../utils/logger");

// Get all characters
const getAllCharacters = async (req, res) => {
  try {
    // Get all characters for the authenticated user
    const characters = await Character.find({ user: req.user._id }).lean();
    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single character
const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    // Verify that the data is a valid type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid character type!" });
    }
    // Find the character by its ID in the database
    const character = await Character.findOne({
      _id: id,
      user: req.user._id,
    }).lean();
    // Verify the character exists
    if (!character) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCharacter = async (req, res) => {
  try {
    const character = await Character.create({
      ...req.body,
      user: req.user._id,
    });
    // Create a log when creating a new character
    await logAction({
      userId: req.user._id,
      action: "Created Character",
      target: "Character",
      targetId: character._id,
      metadata: {
        before: null,
        after: character.toObject(),
      },
    });
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCharacter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Character ID" });
  }
  try {
    const before = await Character.findOne({
      _id: id,
      user: req.user._id,
    }).lean();
    if (!before) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    const after = await Character.findByIdAndUpdate(
      { _id: id, user: req.user._id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
    await logAction({
      userId: req.user._id,
      action: "Updated Character",
      target: "Character",
      targetId: after._id,
      metadata: {
        before,
        after,
      },
    });

    res.status(200).json(after);
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Character Not Found!" });
  }
  try {
    const before = await Character.findOne({
      _id: id,
      user: req.user._id,
    }).lean();
    if (!before) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    await Character.findByIdAndDelete(id);
    await logAction({
      userId: req.user._id,
      action: "Deleted Character",
      target: "Character",
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
module.exports = {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
