import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllArchetypes,
  getArchetypeById,
  createArchetype,
  deleteArchetype,
  updateArchetype,
} from "./archetype.controller.js";

router.get("/", getAllArchetypes);
router.get("/:id", getArchetypeById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createArchetype,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteArchetype,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateArchetype,
);

export default router;
