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
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  // role is never taken from the request; new accounts get the schema default
  const { email, username, password } = req.body;
  try {
    const user = new User({ email, username, password });
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
  // Same rule as role changes: an admin can't remove their own account here
  if (String(req.user._id) === id) {
    return res
      .status(400)
      .json({ error: "You cannot delete your own account" });
  }
  const user = await User.findByIdAndDelete(id).select("-password");
  if (!user) {
    return res.status(400).json({ error: "User Not Found!" });
  }
  res.status(200).json(user);
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User Not Found!" });
  }
  // Stops an admin from demoting themselves and locking everyone out
  if (String(req.user._id) === id) {
    return res.status(400).json({ error: "You cannot change your own role" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true },
    ).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    // runValidators rejects any role outside the enum in user.model.js
    res.status(400).json({ error: error.message });
  }
};

// Any logged-in user can edit their own profile. Every field is optional, and
// only these keys are read from the request so nobody can set their own role
const updateMyProfile = async (req, res) => {
  const { name, showName, pronouns, bio, location, timeZone } =
    req.body.profile ?? {};
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profile: {
          name: name?.trim() ?? "",
          showName: Boolean(showName),
          pronouns: pronouns?.trim() ?? "",
          bio: bio?.trim() ?? "",
          location: location?.trim() ?? "",
          timeZone: timeZone ?? "",
        },
      },
      { new: true, runValidators: true },
    ).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    // runValidators rejects anything over the maxlength limits in user.model.js
    res.status(400).json({ error: error.message });
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserRole,
  updateMyProfile,
};
