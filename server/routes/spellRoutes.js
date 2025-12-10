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

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createSpell
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteSpell
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateSpell
);

module.exports = router;
