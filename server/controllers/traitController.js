const Trait = require("../models/TraitModel");

const getAllTraits = async (req, res) => {
  const traits = await Trait.find({});
  res.status(200).json(traits);
};

const getTraitById = async (req, res) => {
  const { id } = req.params;
  const trait = await Trait.findById(id);
  res.status(200).json(trait);
};

const createTrait = async (req, res) => {
  try {
    const trait = await Trait.create(req.body);
    res.status(200).json({ success: true, message: "Trait CREATED.", trait });
  } catch (error) {
    console.log(error);
  }
};

const updateTrait = async (req, res) => {
  const { id } = req.params;
  const trait = await Trait.findByIdAndUpdate({ _id: id }, { ...req.body });
  res.status(200).json(trait);
};

const deleteTrait = async (req, res) => {
  const { id } = req.params;
  const trait = await Trait.findByIdAndDelete(id);
  res.status(200).json(trait);
};

module.exports = {
  getAllTraits,
  getTraitById,
  createTrait,
  updateTrait,
  deleteTrait,
};
