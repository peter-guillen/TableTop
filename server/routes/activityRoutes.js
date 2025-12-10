const express = require("express");
const router = express.Router();

const { getActivityLogs } = require("../controllers/activityController");
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkAuthorization = require("../middlewares/checkAuthorization");

router.get(
  "/",
  checkAuthenticated,
  checkAuthorization(["admin"]),
  getActivityLogs
);

module.exports = router;
