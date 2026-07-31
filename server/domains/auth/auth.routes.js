import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

import { userMe, loginUser, logoutUser } from "./auth.controller.js";

router.get("/me", checkAuthenticated, userMe);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
