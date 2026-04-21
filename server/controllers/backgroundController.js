const Background = require("../models/BackgroundModel");

const getAllBackgrounds = async (req, res) => {
  const backgrounds = await Background.find({});
  res.status(200).json(backgrounds);
};

const getBackgroundById = async (req, res) => {
  const { id } = req.params;
  const background = await Background.findById(id);
  res.status(200).json(background);
};

const createBackground = async (req, res) => {
  try {
    const background = await Background.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Background CREATED.", background });
  } catch (error) {
    console.log(error);
  }
};

const updateBackground = async (req, res) => {
  const { id } = req.params;
  const background = await Background.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
  );
  res.status(200).json(background);
};

const deleteBackground = async (req, res) => {
  const { id } = req.params;
  const background = await Background.findByIdAndDelete(id);
  res.status(200).json(background);
};

module.exports = {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  updateBackground,
  deleteBackground,
};
