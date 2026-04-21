const Species = require("../models/SpeciesModel");

const getAllSpecies = async (req, res) => {
  const professions = await Species.find({});
  res.status(200).json(professions);
};

const getSpeciesById = async (req, res) => {
  const { id } = req.params;
  const profession = await Species.findById(id);
  res.status(200).json(profession);
};

const createSpecies = async (req, res) => {
  try {
    const profession = await Species.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Species CREATED.", profession });
  } catch (error) {
    console.log(error);
  }
};

const updateSpecies = async (req, res) => {
  const { id } = req.params;
  const profession = await Species.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
  );
  res.status(200).json(profession);
};

const deleteSpecies = async (req, res) => {
  const { id } = req.params;
  const profession = await Species.findByIdAndDelete(id);
  res.status(200).json(profession);
};

module.exports = {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
};
