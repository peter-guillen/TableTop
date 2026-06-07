import express from "express";
const router = express.Router();

import {
  getWeapons,
  getWeapon,
  createWeapon,
  updateWeapon,
  deleteWeapon,
} from "./weapon.controller.js";

router.get("/", getWeapons);
router.post("/", createWeapon);

router.get("/:id", getWeapon);
router.patch("/:id", updateWeapon);
router.delete("/:id", deleteWeapon);

export default router;
