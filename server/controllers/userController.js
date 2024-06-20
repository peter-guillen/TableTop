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
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Login failed" });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
};

module.exports = { getUsers, createUser, loginPage, loginUser };
