import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserRole,
  updateMyProfile,
} from "./user.controller.js";

// Anyone can sign up
router.post("/register", createUser);

// Any logged-in user (every role, including guest) edits their own profile.
// Declared before the "/:id" routes so "me" is never read as an id
router.patch("/me/profile", checkAuthenticated, updateMyProfile);

// Everything below is user management and admin-only
router.get("/", checkAuthenticated, checkAuthorization(["admin"]), getAllUsers);
router.get(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  getUserById,
);
router.patch(
  "/:id/role",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  updateUserRole,
);
router.delete(
  "/:id",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  deleteUser,
);

export default router;
