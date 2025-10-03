const express = require("express");
const router = express.Router();

const {
  getArmors,
  getArmor,
  createArmor,
  deleteArmor,
  updateArmor,
} = require("../controllers/armorController");

router.get("/", getArmors);
router.post("/", createArmor);

router.get("/:id", getArmor);
router.delete("/:id", deleteArmor);
router.patch("/:id", updateArmor);

module.exports = router;
