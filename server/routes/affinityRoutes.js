const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");
const {
  getAllAffinities,
  getAffinityById,
  createAffinity,
  deleteAffinity,
  updateAffinity,
} = require("../controllers/affinityController");

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

module.exports = router;
