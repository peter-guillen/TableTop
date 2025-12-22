const express = require("express");
const router = express.Router();

const { getActivityLogs } = require("../controllers/activityController");
const ActivityLog = require("../models/ActivityModel");
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");

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

module.exports = router;
