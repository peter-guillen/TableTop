import Background from "./background.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllBackgrounds = async () => {
  return await Background.find({}).lean();
};

const getBackgroundById = async (id) => {
  return await Background.findById(id).lean();
};

const createBackground = async (backgroundData, userId) => {
  const background = await Background.create(backgroundData);
  await logAction({
    userId,
    action: "Created Background",
    target: "Background",
    targetId: background._id,
    metadata: { before: null, after: background.toObject() },
  });
  return background;
};

const updateBackground = async (id, updateData, userId) => {
  const before = await Background.findById(id).lean();
  if (!before) return null;

  const after = await Background.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Background",
    target: "Background",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteBackground = async (id, userId) => {
  const before = await Background.findById(id).lean();
  if (!before) return null;

  await Background.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Background",
    target: "Background",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  updateBackground,
  deleteBackground,
};
