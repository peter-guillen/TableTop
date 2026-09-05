import mongoose from "mongoose";
import Item from "./item.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllItems = async () => {
  return await Item.find({}).lean();
};

const getItemById = async (id) => {
  return await Item.findById(id).lean();
};

const createItem = async (itemData, userId) => {
  const item = await Item.create(itemData);
  await logAction({
    userId,
    action: "Created Item",
    target: "Item",
    targetId: item._id,
    metadata: { before: null, after: item.toObject() },
  });
  return item;
};

const updateItem = async (id, updateData, userId) => {
  const before = await Item.findById(id).lean();
  if (!before) return null;

  const after = await Item.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Item",
    target: "Item",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteItem = async (id, userId) => {
  const before = await Item.findById(id).lean();
  if (!before) return null;

  await Item.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Item",
    target: "Item",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export { getAllItems, getItemById, createItem, updateItem, deleteItem };
