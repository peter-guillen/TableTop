const express = require("express");
const router = express.Router();

const {
  getSpells,
  getSpell,
  createSpell,
  deleteSpell,
  updateSpell,
} = require("../controllers/spellController");

router.get("/", getSpells);
router.post("/", createSpell);

router.get("/:id", getSpell);
router.delete("/:id", deleteSpell);
router.patch("/:id", updateSpell);

module.exports = router;
