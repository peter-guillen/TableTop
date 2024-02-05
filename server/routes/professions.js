const express = require("express");

const router = express.Router();

const {
  getProfessions,
  getProfession,
  createProfession,
  deleteProfession,
  updateProfession,
} = require("../controllers/professionController");

router.get("/", getProfessions);
router.post("/", createProfession);

router.get("/:id", getProfession);
router.delete("/:id", deleteProfession);
router.patch("/:id", updateProfession);

module.exports = router;
