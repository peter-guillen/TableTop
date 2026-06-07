import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";
import {
  getAllAffinities,
  getAffinityById,
  createAffinity,
  deleteAffinity,
  updateAffinity,
} from "./affinity.controller.js";

router.get("/", getAllAffinities);
router.get("/:id", getAffinityById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createAffinity,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteAffinity,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateAffinity,
);

export default router;
