import * as itemService from "./item.service.js";

const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: "Item Not Found!" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createItem = async (req, res, next) => {
  try {
    const item = await itemService.createItem(req.body, req.user._id);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await itemService.updateItem(id, req.body, req.user._id);
    if (!item) {
      return res.status(404).json({ error: "Item Not Found!" });
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await itemService.deleteItem(id, req.user._id);
    if (!item) {
      return res.status(404).json({ error: "Item Not Found!" });
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export { getAllItems, getItemById, createItem, updateItem, deleteItem };
