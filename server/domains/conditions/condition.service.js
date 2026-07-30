import mongoose from "mongoose";
import Condition from "./condition.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllConditions = async () => {
  return await Condition.find({}).lean();
};

const getConditionById = async (id) => {
  return await Condition.findById(id).lean();
};

const createCondition = async (conditionData, userId) => {
  const condition = await Condition.create(conditionData);
  await logAction({
    userId,
    action: "Created Condition",
    target: "Condition",
    targetId: condition._id,
    metadata: { before: null, after: condition.toObject() },
  });
  return condition;
};

const updateCondition = async (id, updateData, userId) => {
  const before = await Condition.findById(id).lean();
  if (!before) return null;

  const after = await Condition.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Condition",
    target: "Condition",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteCondition = async (id, userId) => {
  const before = await Condition.findById(id).lean();
  if (!before) return null;

  await Condition.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Condition",
    target: "Condition",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllConditions,
  getConditionById,
  createCondition,
  updateCondition,
  deleteCondition,
};
