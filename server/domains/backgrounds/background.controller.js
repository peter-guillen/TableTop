import * as backgroundService from "./background.service.js";

const getAllBackgrounds = async (req, res) => {
  try {
    const backgrounds = await backgroundService.getAllBackgrounds();
    res.status(200).json(backgrounds);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load backgrounds" });
  }
};

const getBackgroundById = async (req, res) => {
  const { id } = req.params;
  try {
    const background = await backgroundService.getBackgroundById(id);
    if (!background) {
      return res.status(404).json({ error: "Background Not Found!" });
    }
    res.status(200).json(background);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load background" });
  }
};

const createBackground = async (req, res, next) => {
  try {
    const background = await backgroundService.createBackground(
      req.body,
      req.user._id,
    );
    res.status(201).json(background);
  } catch (error) {
    next(error);
  }
};

const updateBackground = async (req, res, next) => {
  const { id } = req.params;
  try {
    const background = await backgroundService.updateBackground(
      id,
      req.body,
      req.user._id,
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
    const background = await backgroundService.deleteBackground(
      id,
      req.user._id,
    );
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
