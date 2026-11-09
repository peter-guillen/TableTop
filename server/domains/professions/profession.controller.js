import Profession from "./profession.model.js";

// Reads answer 500 themselves; ids are already checked by validateObjectId.
// Writes pass errors to next(error), and the error handler in app.js turns
// them into 400 (bad input) or 500 JSON responses.

const getProfessions = async (req, res) => {
  try {
    const professions = await Profession.find({});
    res.status(200).json(professions);
  } catch (error) {
    res.status(500).json({ error: "Failed to load professions" });
  }
};

const getProfession = async (req, res) => {
  const { id } = req.params;
  try {
    const profession = await Profession.findById(id);
    if (!profession) {
      return res.status(404).json({ error: "Profession Not Found!" });
    }
    res.status(200).json(profession);
  } catch (error) {
    res.status(500).json({ error: "Failed to load profession" });
  }
};

const createProfession = async (req, res, next) => {
  try {
    const profession = await Profession.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Profession CREATED.", profession });
  } catch (error) {
    next(error);
  }
};

const updateProfession = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profession = await Profession.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
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
    const profession = await Profession.findByIdAndDelete(id);
    if (!profession) {
      return res.status(404).json({ error: "Profession Not Found!" });
    }
    res.status(200).json(profession);
  } catch (error) {
    next(error);
  }
};

export {
  getProfessions,
  getProfession,
  createProfession,
  updateProfession,
  deleteProfession,
};
