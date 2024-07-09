const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

router.get("/", getUsers);
router.post("/", createUser);

router.get("/login", loginPage);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", (req, res) => {
  res.json(res.user);
});

module.exports = router;
