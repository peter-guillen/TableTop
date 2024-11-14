const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const passport = require("passport");

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }, getUsers)
);
router.post("/register", createUser);

router.get("/login", loginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", ensureAuthenticated, (req, res) => {
  res.json(res.user);
});

router.get("/protected", ensureAuthenticated, (req, res) => {
  res.json({
    message: `Hello, ${req.user.username}! You have accessed a protected route.`,
  });
});

module.exports = router;
