import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllSpells,
  getSpellById,
  createSpell,
  deleteSpell,
  updateSpell,
} from "./spell.controller.js";

router.get("/", getAllSpells);
router.get("/:id", getSpellById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createSpell,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteSpell,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateSpell,
);

export default router;
