import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} from "./user.controller.js";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", createUser);
router.delete("/:id", deleteUser);

export default router;
