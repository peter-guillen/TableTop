import Spell from "./spell.model.js";
import mongoose from "mongoose";
import { logAction } from "../../shared/utils/logger.js";

const getAllSpells = async () => {
  return await Spell.find({}).lean();
};

const getSpellById = async (id) => {
  return await Spell.findById(id).lean();
};

const createSpell = async (spellData, userId) => {
  const spell = await Spell.create(spellData);
  await logAction({
    userId,
    action: "Created Spell",
    target: "Spell",
    targetId: spell._id,
    metadata: { before: null, after: spell.toObject() },
  });
  return spell;
};

const updateSpell = async (id, updateData, userId) => {
  const before = await Spell.findById(id).lean();
  if (!before) return null;

  const after = await Spell.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Spell",
    target: "Spell",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteSpell = async (id, userId) => {
  const before = await Spell.findById(id).lean();
  if (!before) return null;

  await Spell.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Spell",
    target: "Spell",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export { getAllSpells, getSpellById, createSpell, updateSpell, deleteSpell };
