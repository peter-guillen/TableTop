import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
  updateItem,
} from "./item.controller.js";

router.get("/", getAllItems);
router.get("/:id", validateObjectId, getItemById);

router.post("/", checkAuthenticated, checkAuthorization(["admin"]), createItem);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  updateItem,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  deleteItem,
);

export default router;
