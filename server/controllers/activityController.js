const ActivityLog = require("../models/ActivityModel");

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({})
      .populate("userId", "email role") // optional: show who acted
      .sort({ createdAt: -1 }) // newest first
      .lean();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

module.exports = { getActivityLogs };
