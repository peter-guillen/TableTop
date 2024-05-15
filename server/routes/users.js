const express = require("express");
const router = express.Router();

const { getUsers, createUser } = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);

// router.get("/", async (req, res) => {
//   const users = await User.find({});
//   res.status(200).json(users);
// });

// router.post("/register", async (req, res) => {
//   const { email, username, password } = req.body;
//   const user = new User({ email, username });
//   const registeredUser = await User.register(user, password);
// });

module.exports = router;
