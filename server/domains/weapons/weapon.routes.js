import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon,
} from "./weapon.controller.js";

router.get("/", getAllWeapons);
router.get("/:id", getWeaponById);
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
  updateWeapon,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteWeapon,
);

export default router;
