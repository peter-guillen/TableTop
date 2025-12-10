const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    target: {
      type: String, // "Spell", "Weapon", "Armor", etc.
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    metadata: {
      type: Object, // before and after
      default: {},
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
