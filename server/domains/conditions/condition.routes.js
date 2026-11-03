import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllConditions,
  getConditionById,
  createCondition,
  deleteCondition,
  updateCondition,
} from "./condition.controller.js";

router.get("/", getAllConditions);
router.get("/:id", validateObjectId, getConditionById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  createCondition,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  validateObjectId,
  updateCondition,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  validateObjectId,
  deleteCondition,
);

export default router;
