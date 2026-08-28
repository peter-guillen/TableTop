import mongoose from "mongoose";
import Power from "./power.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllPowers = async () => {
  return await Power.find({}).lean();
};

const getPowerById = async (id) => {
  return await Power.findById(id).lean();
};

const createPower = async (powerData, userId) => {
  const power = await Power.create(powerData);
  await logAction({
    userId,
    action: "Created Power",
    target: "Power",
    targetId: power._id,
    metadata: { before: null, after: power.toObject() },
  });
  return power;
};

const updatePower = async (id, updateData, userId) => {
  const before = await Power.findById(id).lean();
  if (!before) return null;

  const after = await Power.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Power",
    target: "Power",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deletePower = async (id, userId) => {
  const before = await Power.findById(id).lean();
  if (!before) return null;

  await Power.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Power",
    target: "Power",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export { getAllPowers, getPowerById, createPower, updatePower, deletePower };
