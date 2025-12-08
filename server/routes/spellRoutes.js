const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");
const {
  getSpells,
  getSpell,
  createSpell,
  deleteSpell,
  updateSpell,
} = require("../controllers/spellController");

router.get("/", getSpells);
router.get("/:id", getSpell);

router.post("/", checkAuthenticated, checkAuthorization, createSpell);
router.delete("/:id", checkAuthenticated, checkAuthorization, deleteSpell);
router.patch("/:id", checkAuthenticated, checkAuthorization, updateSpell);

module.exports = router;
