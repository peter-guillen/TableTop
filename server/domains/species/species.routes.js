import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  deleteSpecies,
  updateSpecies,
} from "./species.controller.js";

router.get("/", getAllSpecies);
router.get("/:id", getSpeciesById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createSpecies,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteSpecies,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateSpecies,
);

export default router;
