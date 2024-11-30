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
  const user = await User.findOne({ username });
  // Check if user or passowrd is correct
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

  // const isMatch = await bcrypt.compare(String(Password), String(user.Password));

  const token = generateToken(user);
  res
    .cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: false, // Secure in production
      maxAge: 3600000, // Set cookie expiry, e.g., 1 hour
      sameSite: "lax",
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
  const user = await User.findById(req.user._id).select("-password");
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
