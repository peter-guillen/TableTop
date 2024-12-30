const Profession = require("../models/ProfessionModel");

const getProfessions = async (req, res) => {
  const professions = await Profession.find({});
  res.status(200).json(professions);
};

const getProfession = async (req, res) => {
  const { id } = req.params;
  const profession = await Profession.findById(id);
  res.status(200).json(profession);
};

const createProfession = async (req, res) => {
  const { title, spell, weapon, armor, levels } = req.body;
  try {
    const profession = await Profession.create({
      title,
      spell,
      weapon,
      armor,
      levels,
    });
    res
      .status(200)
      .json({ success: true, message: "Profession CREATED.", profession });
  } catch (error) {
    console.log(error);
  }
};

const deleteProfession = async (req, res) => {
  const { id } = req.params;
  const profession = await Profession.findByIdAndDelete(id);
  res.status(200).json(profession);
};

const updateProfession = async (req, res) => {
  const { id } = req.params;
  const profession = await Profession.findByIdAndUpdate(
    { _id: id },
    { ...req.body }
  );

  res.status(200).json(profession);
};

module.exports = {
  getProfessions,
  getProfession,
  createProfession,
  deleteProfession,
  updateProfession,
};
