const User = require("../models/UserModel");
const passport = require("passport");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  await User.register(user, password);
  res.status(201).json({ message: "User registered successfully" });
};

const loginPage = (req, res) => {
  res.status(200).send("Login Page");
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Login failed, invalid username or password",
      });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
  })(req, res, next);
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.status(200).json({ success: true, message: "Logout successful" });
  });
};

module.exports = { getUsers, createUser, loginPage, loginUser, logoutUser };
