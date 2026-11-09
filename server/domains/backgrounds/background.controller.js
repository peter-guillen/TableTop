import Background from "./background.model.js";

// Reads answer 500 themselves; ids are already checked by validateObjectId.
// Writes pass errors to next(error), and the error handler in app.js turns
// them into 400 (bad input) or 500 JSON responses.

const getAllBackgrounds = async (req, res) => {
  try {
    const backgrounds = await Background.find({});
    res.status(200).json(backgrounds);
  } catch (error) {
    res.status(500).json({ error: "Failed to load backgrounds" });
  }
};

const getBackgroundById = async (req, res) => {
  const { id } = req.params;
  try {
    const background = await Background.findById(id);
    if (!background) {
      return res.status(404).json({ error: "Background Not Found!" });
    }
    res.status(200).json(background);
  } catch (error) {
    res.status(500).json({ error: "Failed to load background" });
  }
};

const createBackground = async (req, res, next) => {
  try {
    const background = await Background.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Background CREATED.", background });
  } catch (error) {
    next(error);
  }
};

const updateBackground = async (req, res, next) => {
  const { id } = req.params;
  try {
    const background = await Background.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
    );
    if (!background) {
      return res.status(404).json({ error: "Background Not Found!" });
    }
    res.status(200).json(background);
  } catch (error) {
    next(error);
  }
};

const deleteBackground = async (req, res, next) => {
  const { id } = req.params;
  try {
    const background = await Background.findByIdAndDelete(id);
    if (!background) {
      return res.status(404).json({ error: "Background Not Found!" });
    }
    res.status(200).json(background);
  } catch (error) {
    next(error);
  }
};

export {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  updateBackground,
  deleteBackground,
};
