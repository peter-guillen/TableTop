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

router.get("/me", ensureAuthenticated, async (req, res) => {
  try {
    // Fetch the user by the decoded user ID (stored in req.user from the middleware)
    const user = await User.findById(req.user._id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send user data as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin", verifyRole(["ADMIN"]), (req, res) => {
  res.send("Hey ADMIN");
});

router.get(
  "/adminonly",
  ensureAuthenticated,
  verifyRole(["ADMIN"]),
  (req, res) => {
    // res.json({ message: "ADMIN Route" });
    res.send("Hey ADMIN");
  }
);

router.get("/authenticate", ensureAuthenticated, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

module.exports = router;
