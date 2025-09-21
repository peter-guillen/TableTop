const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");

const {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  userMe,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/:id", deleteUser);

router.get("/me", checkAuthenticated, userMe);

module.exports = router;
