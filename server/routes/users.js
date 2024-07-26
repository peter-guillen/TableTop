const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);

router.get("/login", loginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", ensureAuthenticated, (req, res) => {
  res.json(res.user);
});

module.exports = router;
