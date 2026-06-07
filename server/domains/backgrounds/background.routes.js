import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  deleteBackground,
  updateBackground,
} from "./background.controller.js";

router.get("/", getAllBackgrounds);
router.get("/:id", getBackgroundById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createBackground,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteBackground,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateBackground,
);

export default router;
