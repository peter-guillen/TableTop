import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllTraits,
  getTraitById,
  createTrait,
  deleteTrait,
  updateTrait,
} from "./trait.controller.js";

router.get("/", getAllTraits);
router.get("/:id", getTraitById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createTrait,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteTrait,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateTrait,
);

export default router;
