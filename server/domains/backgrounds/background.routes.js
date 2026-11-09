import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import validateObjectId from "../../shared/middlewares/validateObjectId.js";
import {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  deleteBackground,
  updateBackground,
} from "./background.controller.js";

router.get("/", getAllBackgrounds);
router.get("/:id", validateObjectId, getBackgroundById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  createBackground,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  validateObjectId,
  deleteBackground,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator", "editor"]),
  validateObjectId,
  updateBackground,
);

export default router;
