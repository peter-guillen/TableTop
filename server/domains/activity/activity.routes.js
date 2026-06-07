import express from "express";
const router = express.Router();

import { getActivityLogs } from "./activity.controller.js";
import ActivityLog from "./activity.model.js";
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";
import checkAuthorization from "../../shared/middlewares/checkAuthorization.js";

// router.get(
//   "/",
//   checkAuthenticated,
//   checkAuthorization(["admin"]),
//   getActivityLogs
// );
router.get("/", async (req, res) => {
  const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(100);
  res.json(logs);
});

export default router;
