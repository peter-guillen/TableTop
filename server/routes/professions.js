const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyRole = require("../middlewares/verifyRole");

const {
  getProfessions,
  getProfession,
  createProfession,
  deleteProfession,
  updateProfession,
} = require("../controllers/professionController");

router.get("/", getProfessions);
router.post("/", ensureAuthenticated, verifyRole(["ADMIN"]), createProfession);

router.get("/:id", getProfession);
router.delete("/:id", deleteProfession);
router.patch("/:id", updateProfession);

module.exports = router;
