const User = require("../models/UserModel");
const passport = require("passport");
const generateToken = require("../middlewares/authUtils");

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

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err);
      const token = generateToken(user);
      res
        .cookie("jwt", token, {
          httpOnly: true, // Prevents JavaScript access
          secure: process.env.NODE_ENV === "production", // Secure in production
          maxAge: 3600000, // Set cookie expiry, e.g., 1 hour
          sameSite: "strict",
        })
        .status(200)
        .json({
          message: "Login successful",
          token,
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
  //   if (err) {
  //     return res.status(500).json({ success: false, message: "Logout failed" });
  //   }
  //   res.status(200).json({ success: true, message: "Logout successful" });
  // });
  res.clearCookie("jwt").status(200).json({ message: "Logout successful" });
};

module.exports = { getUsers, createUser, loginPage, loginUser, logoutUser };
