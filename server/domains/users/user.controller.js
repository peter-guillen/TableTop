import * as userService from "./user.service.js";
import generateToken from "../../shared/middlewares/jwtoken.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to load user" });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    // Log the new user in right away. Same cookie settings as loginUser in
    // auth.controller.js
    const token = generateToken(user);
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
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
    // Missing or invalid fields. Responding here instead of rethrowing keeps
    // a bad signup request from crashing the server
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Registration failed" });
  }
};

// The service throws a status 400 error when an admin targets their own
// account; the error handler in app.js answers it with { error }.
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(id, req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.updateUserRole(
      id,
      req.body.role,
      req.user._id,
    );
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const user = await userService.updateMyProfile(
      req.user._id,
      req.body.profile,
    );
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
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
