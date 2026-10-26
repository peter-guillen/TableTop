import Character from "./character.model.js";
import mongoose from "mongoose";
import { logAction } from "../../shared/utils/logger.js";

const ALLOWED_FIELDS = [
  "identity",
  "origin",
  "mode",
  "archetype",
  "progression",
  "stats",
  "inventory",
  "equipment",
  "powers",
  "skills",
];

const pickAllowed = (body) =>
  Object.fromEntries(
    Object.entries(body ?? {}).filter(([key]) => ALLOWED_FIELDS.includes(key)),
  );

const sendError = (res, error) => {
  const isClientError =
    error.name === "ValidationError" || error.name === "CastError";
  res.status(isClientError ? 400 : 500).json({ error: error.message });
};

const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.user._id }).lean();
    res.status(200).json(characters);
  } catch (error) {
    sendError(res, error);
  }
};

const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid character ID" });
    }
    const character = await Character.findOne({
      _id: id,
      userId: req.user._id,
    }).lean();
    if (!character) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    res.status(200).json(character);
  } catch (error) {
    sendError(res, error);
  }
};

const createCharacter = async (req, res) => {
  try {
    const character = await Character.create({
      ...pickAllowed(req.body),
      userId: req.user._id,
    });
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
    sendError(res, error);
  }
};

const updateCharacter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid character ID" });
  }
  try {
    const before = await Character.findOne({
      _id: id,
      userId: req.user._id,
    }).lean();
    if (!before) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    const after = await Character.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: pickAllowed(req.body) },
      { new: true, runValidators: true },
    ).lean();
    await logAction({
      userId: req.user._id,
      action: "Updated Character",
      target: "Character",
      targetId: after._id,
      metadata: { before, after },
    });
    res.status(200).json(after);
  } catch (error) {
    sendError(res, error);
  }
};

const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid character ID" });
  }
  try {
    const before = await Character.findOne({
      _id: id,
      userId: req.user._id,
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
      metadata: { before, after: null },
    });
    res.status(200).json(before);
  } catch (error) {
    sendError(res, error);
  }
};

export {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
