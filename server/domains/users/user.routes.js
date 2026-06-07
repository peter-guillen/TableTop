import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import {
  getUsers,
  userMe,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
} from "./user.controller.js";

router.get("/", getUsers);
router.get("/me", checkAuthenticated, userMe);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/:id", deleteUser);

export default router;
