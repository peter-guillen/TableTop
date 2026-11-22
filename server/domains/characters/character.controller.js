import * as characterService from "./character.service.js";

const getAllCharacters = async (req, res) => {
  try {
    const characters = await characterService.getAllCharacters(req.user._id);
    res.status(200).json(characters);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load characters" });
  }
};

const getCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await characterService.getCharacterById(
      id,
      req.user._id,
    );
    if (!character) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    res.status(200).json(character);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load character" });
  }
};

const createCharacter = async (req, res, next) => {
  try {
    const character = await characterService.createCharacter(
      req.body,
      req.user._id,
    );
    res.status(201).json(character);
  } catch (error) {
    next(error);
  }
};

const updateCharacter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const character = await characterService.updateCharacter(
      id,
      req.body,
      req.user._id,
    );
    if (!character) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
};

const deleteCharacter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const character = await characterService.deleteCharacter(
      id,
      req.user._id,
    );
    if (!character) {
      return res.status(404).json({ error: "Character Not Found!" });
    }
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
};

export {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
