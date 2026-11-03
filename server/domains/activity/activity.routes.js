import express from "express";
const router = express.Router();

import { getActivityLogs } from "./activity.controller.js";
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

router.get(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin", "moderator"]),
  getActivityLogs,
);

export default router;
