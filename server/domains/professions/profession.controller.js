import * as professionService from "./profession.service.js";

const getAllProfessions = async (req, res) => {
  try {
    const professions = await professionService.getAllProfessions();
    res.status(200).json(professions);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load professions" });
  }
};

const getProfessionById = async (req, res) => {
  const { id } = req.params;
  try {
    const profession = await professionService.getProfessionById(id);
    if (!profession) {
      return res.status(404).json({ error: "Profession Not Found!" });
    }
    res.status(200).json(profession);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load profession" });
  }
};

const createProfession = async (req, res, next) => {
  try {
    const profession = await professionService.createProfession(
      req.body,
      req.user._id,
    );
    res.status(201).json(profession);
  } catch (error) {
    next(error);
  }
};

const updateProfession = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profession = await professionService.updateProfession(
      id,
      req.body,
      req.user._id,
    );
    if (!profession) {
      return res.status(404).json({ error: "Profession Not Found!" });
    }
    res.status(200).json(profession);
  } catch (error) {
    next(error);
  }
};

const deleteProfession = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profession = await professionService.deleteProfession(
      id,
      req.user._id,
    );
    if (!profession) {
      return res.status(404).json({ error: "Profession Not Found!" });
    }
    res.status(200).json(profession);
  } catch (error) {
    next(error);
  }
};

export {
  getAllProfessions,
  getProfessionById,
  createProfession,
  updateProfession,
  deleteProfession,
};
