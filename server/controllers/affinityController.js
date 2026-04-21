const Affinity = require("../models/AffinityModel");

const getAllAffinities = async (req, res) => {
  const affinities = await Affinity.find({});
  res.status(200).json(affinities);
};

const getAffinityById = async (req, res) => {
  const { id } = req.params;
  const affinity = await Affinity.findById(id);
  res.status(200).json(affinity);
};

const createAffinity = async (req, res) => {
  try {
    const affinity = await Affinity.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Affinity CREATED.", affinity });
  } catch (error) {
    console.log(error);
  }
};

const updateAffinity = async (req, res) => {
  const { id } = req.params;
  const affinity = await Affinity.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
  );
  res.status(200).json(affinity);
};

const deleteAffinity = async (req, res) => {
  const { id } = req.params;
  const affinity = await Affinity.findByIdAndDelete(id);
  res.status(200).json(affinity);
};

module.exports = {
  getAllAffinities,
  getAffinityById,
  createAffinity,
  updateAffinity,
  deleteAffinity,
};
