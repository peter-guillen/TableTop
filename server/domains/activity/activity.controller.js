import ActivityLog from "./activity.model.js";

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({})
      .populate("userId", "username email role") // show who acted
      .sort({ createdAt: -1 }) // newest first
      .limit(100)
      .lean();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

export { getActivityLogs };
