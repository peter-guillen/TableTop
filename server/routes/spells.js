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

router.get("/", checkAuthenticated, checkAuthorization(["ADMIN"]), getSpells);
router.post("/", createSpell);

router.get("/:id", getSpell);
router.delete("/:id", deleteSpell);
router.patch("/:id", updateSpell);

module.exports = router;
