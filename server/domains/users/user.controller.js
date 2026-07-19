import User from "./user.model.js";
import mongoose from "mongoose";

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid User ID" });
  }
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { email, username, password, role } = req.body;
  try {
    const user = new User({ email, username, password, role });
    await user.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }
    throw error;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User Not Found!" });
  }
  const user = await User.findByIdAndDelete(id).select("-password");
  if (!user) {
    return res.status(400).json({ error: "User Not Found!" });
  }
  res.status(200).json(user);
};

export { getAllUsers, getUserById, createUser, deleteUser };
