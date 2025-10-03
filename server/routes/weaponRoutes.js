const express = require("express");
const router = express.Router();

const {
  getWeapons,
  getWeapon,
  createWeapon,
  updateWeapon,
  deleteWeapon,
} = require("../controllers/weaponController");

router.get("/", getWeapons);
router.post("/", createWeapon);

router.get("/:id", getWeapon);
router.patch("/:id", updateWeapon);
router.delete("/:id", deleteWeapon);

module.exports = router;
