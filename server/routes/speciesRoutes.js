const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");
const {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  deleteSpecies,
  updateSpecies,
} = require("../controllers/speciesController");

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

module.exports = router;
