const express = require("express");
const router = express.Router();

const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
  userMe,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", createUser);
router.get("/login", loginPage);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", userMe);

module.exports = router;
