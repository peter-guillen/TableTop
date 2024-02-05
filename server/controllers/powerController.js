const Power = require("../models/PowerModel");
const mongoose = require("mongoose");

const getPowers = async (req, res) => {
  const powers = await Power.find({});
  res.status(200).json(powers);
};

const getPower = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Power Not Found!" });
  }
  const power = await Power.findById(id);
  if (!power) {
    return res.status(404).json({ error: "Power Not Found!" });
  }
  res.status(200).json(power);
};

const createPower = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const power = await Power.create({ title, description, category });
    res.status(200).json(power);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePower = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Power Not Found!" });
  }
  const power = await Power.findByIdAndDelete(id);
  if (!power) {
    res.status(400).json({ error: "Power Not Found!" });
  }
  res.status(200).json(power);
};

const updatePower = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Power Not Found!" });
  }
  const power = await Power.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!power) {
    return res.status(400).json({ error: "Power Not Found!" });
  }
  res.status(200).json(power);
};

module.exports = { getPowers, getPower, createPower, deletePower, updatePower };
