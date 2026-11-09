import Species from "./species.model.js";

// Reads answer 500 themselves; ids are already checked by validateObjectId.
// Writes pass errors to next(error), and the error handler in app.js turns
// them into 400 (bad input) or 500 JSON responses.
// The create response keeps its "profession" key because that's the shape
// the API already returns.

const getAllSpecies = async (req, res) => {
  try {
    const species = await Species.find({});
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ error: "Failed to load species" });
  }
};

const getSpeciesById = async (req, res) => {
  const { id } = req.params;
  try {
    const species = await Species.findById(id);
    if (!species) {
      return res.status(404).json({ error: "Species Not Found!" });
    }
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ error: "Failed to load species" });
  }
};

const createSpecies = async (req, res, next) => {
  try {
    const profession = await Species.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Species CREATED.", profession });
  } catch (error) {
    next(error);
  }
};

const updateSpecies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const species = await Species.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
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
    const species = await Species.findByIdAndDelete(id);
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
