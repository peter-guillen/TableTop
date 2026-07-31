import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllSpells,
  getSpellById,
  createSpell,
  deleteSpell,
  updateSpell,
} from "./spell.controller.js";

router.get("/", getAllSpells);
router.get("/:id", validateObjectId, getSpellById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createSpell,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  updateSpell,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  validateObjectId,
  deleteSpell,
);

export default router;
