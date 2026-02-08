const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");

const {
  getUsers,
  userMe,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/me", checkAuthenticated, userMe);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/:id", deleteUser);

module.exports = router;
