import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import {
  getProfessions,
  getProfession,
  createProfession,
  deleteProfession,
  updateProfession,
} from "./profession.controller.js";

router.get(
  "/",
  // checkAuthenticated,
  // checkAuthorization(["admin"]),
  getProfessions,
);
router.post("/", createProfession);

router.get("/:id", getProfession);
router.delete("/:id", deleteProfession);
router.patch("/:id", updateProfession);

export default router;
