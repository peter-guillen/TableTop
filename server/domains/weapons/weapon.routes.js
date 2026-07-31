import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  deleteWeapon,
  updateWeapon,
} from "./weapon.controller.js";

router.get("/", getAllWeapons);
router.get("/:id", validateObjectId, getWeaponById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createWeapon,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  updateWeapon,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  deleteWeapon,
);

export default router;
