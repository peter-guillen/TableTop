const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
} = require("../controllers/userController");
const passport = require("passport");

router.get("/", getUsers);
router.post("/", createUser);

router.get("/login", loginPage);

router.post("/login", loginUser);
module.exports = router;
