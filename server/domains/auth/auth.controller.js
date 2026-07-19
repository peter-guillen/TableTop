import User from "../users/user.model.js";
import mongoose from "mongoose";
import generateToken from "../../shared/middlewares/jwtoken.js";

const userMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = generateToken(user);
  const isProduction = process.env.NODE_ENV === "production";
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
};

const logoutUser = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res
    .clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .status(200)
    .json({ success: true, message: "Logout successful" });
};

export { userMe, loginUser, logoutUser };
