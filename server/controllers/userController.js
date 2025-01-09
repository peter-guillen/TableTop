const User = require("../models/UserModel");
const generateToken = require("../middlewares/jwtoken");

// Find all users
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Verify that the username is correct
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
  // Verify that the password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
  // Generate a token imported from jwt middleware
  const token = generateToken(user);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      sameSite: "strict",
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username, // Used for frontend user welcome
        email: user.email,
        role: user.role, // Used for checkAuthorization middleware and frontend protectedRoute
      },
    });
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ success: true, message: "Logout successful" });
};

const userMe = async (req, res) => {
  // Finds the user ignoring by userId and not password
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
  userMe,
};
