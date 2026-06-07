import express from "express";
const router = express.Router();

import {
  getArmors,
  getArmor,
  createArmor,
  deleteArmor,
  updateArmor,
} from "./armor.controller.js";

router.get("/", getArmors);
router.post("/", createArmor);

router.get("/:id", getArmor);
router.delete("/:id", deleteArmor);
router.patch("/:id", updateArmor);

export default router;
