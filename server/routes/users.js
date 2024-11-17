const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyRole = require("../middlewares/verifyRole");

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/register", createUser);
router.get("/login", loginPage);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get(
  "/adminonly",
  ensureAuthenticated,
  verifyRole(["ADMIN"]),
  (req, res) => {
    res.json({ message: "ADMIN Route" });
  }
);

router.get("/authenticate", ensureAuthenticated, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

module.exports = router;
