import Species from "./species.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllSpecies = async () => {
  return await Species.find({}).lean();
};

const getSpeciesById = async (id) => {
  return await Species.findById(id).lean();
};

const createSpecies = async (speciesData, userId) => {
  const species = await Species.create(speciesData);
  await logAction({
    userId,
    action: "Created Species",
    target: "Species",
    targetId: species._id,
    metadata: { before: null, after: species.toObject() },
  });
  return species;
};

const updateSpecies = async (id, updateData, userId) => {
  const before = await Species.findById(id).lean();
  if (!before) return null;

  const after = await Species.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Species",
    target: "Species",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteSpecies = async (id, userId) => {
  const before = await Species.findById(id).lean();
  if (!before) return null;

  await Species.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Species",
    target: "Species",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
};
