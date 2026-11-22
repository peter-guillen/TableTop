import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";

import {
  getAllProfessions,
  getProfessionById,
  createProfession,
  deleteProfession,
  updateProfession,
} from "./profession.controller.js";

router.get("/", getAllProfessions);
router.get("/:id", validateObjectId, getProfessionById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  createProfession,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  validateObjectId,
  updateProfession,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  validateObjectId,
  deleteProfession,
);

export default router;
