const express = require("express");

const router = express.Router();

const {
  getPowers,
  getPower,
  createPower,
  deletePower,
  updatePower,
} = require("../controllers/powerController");

router.get("/", getPowers);
router.post("/", createPower);

router.get("/:id", getPower);
router.delete("/:id", deletePower);
router.patch("/:id", updatePower);

module.exports = router;
