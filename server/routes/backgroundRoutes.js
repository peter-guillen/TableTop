const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");
const {
  getAllBackgrounds,
  getBackgroundById,
  createBackground,
  deleteBackground,
  updateBackground,
} = require("../controllers/backgroundController");

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

module.exports = router;
