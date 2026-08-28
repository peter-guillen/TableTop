import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllPowers,
  getPowerById,
  createPower,
  deletePower,
  updatePower,
} from "./power.controller.js";

router.get("/", getAllPowers);
router.get("/:id", validateObjectId, getPowerById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createPower,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  updatePower,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  deletePower,
);

export default router;
