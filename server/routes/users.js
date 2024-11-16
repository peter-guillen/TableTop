const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyRole = require("../middlewares/verifyRole");

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get(
  "/users",
  getUsers
  // passport.authenticate("jwt", { session: false }, getUsers)
);
router.post("/register", createUser);
router.get("/login", loginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get(
  "/adminonly",
  // passport.authenticate("jwt", { session: false }),
  ensureAuthenticated,
  verifyRole(["ADMIN"]),
  (req, res) => {
    res.json({ message: "ADMIN Route" });
  }
);

router.get(
  "/authenticate",
  ensureAuthenticated,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  }
);

module.exports = router;
