import * as weaponService from "./weapon.service.js";

const getAllWeapons = async (req, res) => {
  try {
    const weapons = await weaponService.getAllWeapons();
    res.status(200).json(weapons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWeaponById = async (req, res) => {
  const { id } = req.params;
  try {
    const weapon = await weaponService.getWeaponById(id);
    if (!weapon) {
      return res.status(404).json({ error: "Weapon Not Found!" });
    }
    res.status(200).json(weapon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWeapon = async (req, res, next) => {
  try {
    const weapon = await weaponService.createWeapon(req.body, req.user._id);
    res.status(201).json(weapon);
  } catch (error) {
    next(error);
  }
};

const updateWeapon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const weapon = await weaponService.updateWeapon(id, req.body, req.user._id);
    if (!weapon) {
      return res.status(404).json({ error: "Weapon Not Found!" });
    }
    res.status(200).json(weapon);
  } catch (error) {
    next(error);
  }
};

const deleteWeapon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const weapon = await weaponService.deleteWeapon(id, req.user._id);
    if (!weapon) {
      return res.status(404).json({ error: "Weapon Not Found!" });
    }
    res.status(200).json(weapon);
  } catch (error) {
    next(error);
  }
};

export {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon,
};
