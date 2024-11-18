const User = require("../models/UserModel");
const generateToken = require("../middlewares/authUtils");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const createUser = async (req, res) => {
  const { email, username, password, role } = req.body;
  const user = new User({ email, username, role });
  await User.register(user, password);
  res
    .status(201)
    .json({ success: true, message: "User registered successfully", user });
};

const loginPage = (req, res) => {
  res.status(200).send("Login Page");
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  // Validate password (assuming you have a comparePassword method in your User schema)
  // const isMatch = await user.comparePassword(password);
  // if (!isMatch) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Invalid username or password",
  //   });
  // }
  const token = generateToken(user);
  res
    .cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Secure in production
      maxAge: 3600000, // Set cookie expiry, e.g., 1 hour
      sameSite: "strict",
    })
    .status(200)
    .json({ success: true, user });
};

const logoutUser = (req, res) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
module.exports = { getUsers, createUser, loginPage, loginUser, logoutUser };
