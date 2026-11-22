import Profession from "./profession.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllProfessions = async () => {
  return await Profession.find({}).lean();
};

const getProfessionById = async (id) => {
  return await Profession.findById(id).lean();
};

const createProfession = async (professionData, userId) => {
  const profession = await Profession.create(professionData);
  await logAction({
    userId,
    action: "Created Profession",
    target: "Profession",
    targetId: profession._id,
    metadata: { before: null, after: profession.toObject() },
  });
  return profession;
};

const updateProfession = async (id, updateData, userId) => {
  const before = await Profession.findById(id).lean();
  if (!before) return null;

  const after = await Profession.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Profession",
    target: "Profession",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteProfession = async (id, userId) => {
  const before = await Profession.findById(id).lean();
  if (!before) return null;

  await Profession.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Profession",
    target: "Profession",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllProfessions,
  getProfessionById,
  createProfession,
  updateProfession,
  deleteProfession,
};
