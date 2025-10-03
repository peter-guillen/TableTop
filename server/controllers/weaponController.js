const Weapon = require("../models/WeaponModel");
const mongoose = require("mongoose");

const getWeapons = async (req, res) => {
  const weapons = await Weapon.find({});
  res.status(200).json(weapons);
};

const getWeapon = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Weapon Not Found!" });
  }
  const weapon = await Weapon.findById(id);
  if (!weapon) {
    return res.status(404).json({ error: "Weapon Not Found!" });
  }
  res.status(200).json(weapon);
};

const createWeapon = async (req, res) => {
  const {
    name,
    description,
    category,
    properties,
    weight,
    damage,
    skills,
    range,
  } = req.body;
  try {
    const weapon = await Weapon.create({
      name,
      description,
      category,
      properties,
      weight,
      damage,
      skills,
      range,
    });
    res.status(200).json(weapon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWeapon = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Weapon Not Found!" });
  }
  const weapon = await Weapon.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!weapon) {
    return res.status(400).json({ error: "Weapon Not Found!" });
  }
  res.status(200).json(weapon);
};

const deleteWeapon = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Weapon Not Found!" });
  }
  const weapon = await Weapon.findByIdAndDelete(id);
  if (!weapon) {
    res.status(400).json({ error: "Weapon Not Found!" });
  }
  res.status(200).json(weapon);
};

module.exports = {
  getWeapons,
  getWeapon,
  createWeapon,
  updateWeapon,
  deleteWeapon,
};
