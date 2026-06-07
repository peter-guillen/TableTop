import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} from "./character.controller.js";

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createCharacter,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteCharacter,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateCharacter,
);

export default router;
