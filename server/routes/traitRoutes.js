const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");
const {
  getAllTraits,
  getTraitById,
  createTrait,
  deleteTrait,
  updateTrait,
} = require("../controllers/traitController");

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

module.exports = router;
