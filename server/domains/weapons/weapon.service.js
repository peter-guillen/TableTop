import mongoose from "mongoose";
import Weapon from "./weapon.model.js";
import { logAction } from "../../shared/utils/logger.js";

const getAllWeapons = async () => {
  return await Weapon.find({}).lean();
};

const getWeaponById = async (id) => {
  return await Weapon.findById(id).lean();
};

const createWeapon = async (weaponData, userId) => {
  const weapon = await Weapon.create(weaponData);
  await logAction({
    userId,
    action: "Created Weapon",
    target: "Weapon",
    targetId: weapon._id,
    metadata: { before: null, after: weapon.toObject() },
  });
  return weapon;
};

const updateWeapon = async (id, updateData, userId) => {
  const before = await Weapon.findById(id).lean();
  if (!before) return null;

  const after = await Weapon.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Weapon",
    target: "Weapon",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteWeapon = async (id, userId) => {
  const before = await Weapon.findById(id).lean();
  if (!before) return null;

  await Weapon.findByIdAndDelete(id);

  await logAction({
    userId,
    action: "Deleted Weapon",
    target: "Weapon",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon,
};
