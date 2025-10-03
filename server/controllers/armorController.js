const Armor = require("../models/ArmorModel");
const mongoose = require("mongoose");

const getArmors = async (req, res) => {
  const armors = await Armor.find({});
  res.status(200).json(armors);
};

const getArmor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Armor Not Found!" });
  }
  const armor = await Armor.findById(id);
  if (!armor) {
    return res.status(404).json({ error: "Armor Not Found!" });
  }
  res.status(200).json(armor);
};

const createArmor = async (req, res) => {
  const {
    name,
    description,
    category,
    defense,
    weight,
    requirement,
    penalty,
    material,
  } = req.body;
  try {
    const armor = await Armor.create({
      name,
      description,
      category,
      defense,
      weight,
      requirement,
      penalty,
      material,
    });
    res.status(200).json(armor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateArmor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Armor Not Found!" });
  }
  const armor = await Armor.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!armor) {
    return res.status(400).json({ error: "Armor Not Found!" });
  }
  res.status(200).json(armor);
};

const deleteArmor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Armor Not Found!" });
  }
  const armor = await Armor.findByIdAndDelete(id);
  if (!armor) {
    res.status(400).json({ error: "Armor Not Found!" });
  }
  res.status(200).json(armor);
};

module.exports = {
  getArmors,
  getArmor,
  createArmor,
  updateArmor,
  deleteArmor,
};
