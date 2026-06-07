import ActivityLog from "../../domains/activity/activity.model.js";

async function logAction({ userId, action, target, targetId, metadata }) {
  try {
    await ActivityLog.create({
      userId,
      action,
      target,
      targetId,
      metadata,
    });
  } catch (err) {
    console.error("Failed to write activity log:", err.message);
  }
}

export { logAction };
