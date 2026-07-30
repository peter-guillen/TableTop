import * as conditionService from "./condition.service.js";

const getAllConditions = async (req, res) => {
  try {
    const conditions = await conditionService.getAllConditions();
    res.status(200).json(conditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getConditionById = async (req, res) => {
  const { id } = req.params;
  try {
    const condition = await conditionService.getConditionById(id);
    if (!condition) {
      return res.status(404).json({ error: "Condition Not Found!" });
    }
    res.status(200).json(condition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCondition = async (req, res, next) => {
  try {
    const condition = await conditionService.createCondition(
      req.body,
      req.user._id,
    );
    res.status(201).json(condition);
  } catch (error) {
    next(error);
  }
};

const updateCondition = async (req, res, next) => {
  const { id } = req.params;
  try {
    const condition = await conditionService.updateCondition(
      id,
      req.body,
      req.user._id,
    );
    if (!condition) {
      return res.status(404).json({ error: "Condition Not Found!" });
    }
    res.status(200).json(condition);
  } catch (error) {
    next(error);
  }
};

const deleteCondition = async (req, res, next) => {
  const { id } = req.params;
  try {
    const condition = await conditionService.deleteCondition(id, req.user._id);
    if (!condition) {
      return res.status(404).json({ error: "Condition Not Found!" });
    }
    res.status(200).json(condition);
  } catch (error) {
    next(error);
  }
};

export {
  getAllConditions,
  getConditionById,
  createCondition,
  updateCondition,
  deleteCondition,
};
