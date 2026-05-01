const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");
const {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} = require("../controllers/characterController");

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);

router.post(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  createCharacter,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteCharacter,
);
router.patch(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateCharacter,
);

module.exports = router;
