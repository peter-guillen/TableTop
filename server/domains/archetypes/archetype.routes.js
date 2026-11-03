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
  checkAuthorization(["admin", "moderator", "editor"]),
  createArchetype,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  deleteArchetype,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  updateArchetype,
);

export default router;
