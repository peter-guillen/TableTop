const User = require("../models/UserModel");
const generateToken = require("../middlewares/jwtoken");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const createUser = async (req, res) => {
  const { email, username, password, role } = req.body;
  const user = new User({ email, username, password, role });
  await user.save();
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};

const loginPage = (req, res) => {
  res.status(200).send("Login Page");
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // Check if user or passowrd is correct
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
  // Check password verfication
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const token = generateToken(user);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    })
    .status(200)
    .json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

const userMe = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

module.exports = {
  getUsers,
  createUser,
  loginPage,
  loginUser,
  logoutUser,
  userMe,
};
