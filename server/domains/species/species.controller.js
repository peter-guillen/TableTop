import * as speciesService from "./species.service.js";

const getAllSpecies = async (req, res) => {
  try {
    const species = await speciesService.getAllSpecies();
    res.status(200).json(species);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load species" });
  }
};

const getSpeciesById = async (req, res) => {
  const { id } = req.params;
  try {
    const species = await speciesService.getSpeciesById(id);
    if (!species) {
      return res.status(404).json({ error: "Species Not Found!" });
    }
    res.status(200).json(species);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load species" });
  }
};

const createSpecies = async (req, res, next) => {
  try {
    const species = await speciesService.createSpecies(req.body, req.user._id);
    res.status(201).json(species);
  } catch (error) {
    next(error);
  }
};

const updateSpecies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const species = await speciesService.updateSpecies(
      id,
      req.body,
      req.user._id,
    );
    if (!species) {
      return res.status(404).json({ error: "Species Not Found!" });
    }
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
};

const deleteSpecies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const species = await speciesService.deleteSpecies(id, req.user._id);
    if (!species) {
      return res.status(404).json({ error: "Species Not Found!" });
    }
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
};

export {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
};
