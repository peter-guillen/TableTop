const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");

const {
  getPowers,
  getPower,
  createPower,
  deletePower,
  updatePower,
} = require("../controllers/powerController");

router.get("/", checkAuthenticated, checkAuthorization(["ADMIN"]), getPowers);
router.post("/", createPower);

router.get("/:id", getPower);
router.delete("/:id", deletePower);
router.patch("/:id", updatePower);

module.exports = router;
