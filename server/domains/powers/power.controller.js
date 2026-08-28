import * as powerService from "./power.service.js";

const getAllPowers = async (req, res) => {
  try {
    const powers = await powerService.getAllPowers();
    res.status(200).json(powers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPowerById = async (req, res) => {
  const { id } = req.params;
  try {
    const power = await powerService.getPowerById(id);
    if (!power) {
      return res.status(404).json({ error: "Power Not Found!" });
    }
    res.status(200).json(power);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPower = async (req, res, next) => {
  try {
    const power = await powerService.createPower(req.body, req.user._id);
    res.status(201).json(power);
  } catch (error) {
    next(error);
  }
};

const updatePower = async (req, res, next) => {
  const { id } = req.params;
  try {
    const power = await powerService.updatePower(id, req.body, req.user._id);
    if (!power) {
      return res.status(404).json({ error: "Power Not Found!" });
    }
    res.status(200).json(power);
  } catch (error) {
    next(error);
  }
};

const deletePower = async (req, res, next) => {
  const { id } = req.params;
  try {
    const power = await powerService.deletePower(id, req.user._id);
    if (!power) {
      return res.status(404).json({ error: "Power Not Found!" });
    }
    res.status(200).json(power);
  } catch (error) {
    next(error);
  }
};

export { getAllPowers, getPowerById, createPower, updatePower, deletePower };
