import mongoose from "mongoose";
import { CONDITIONS } from "../constants/constants.js";

const ConditionSchema = new mongoose.Schema(
  {
    condition: { type: String, enum: CONDITIONS, required: true },
    target: { type: String, enum: ["self", "enemy", "ally"], required: true },
    duration: { type: String, enum: ["turns", "until_broken", "permanent"] },
    durationType: { type: String, enum: ["self", "enemy", "ally"] },
    trigger: { type: String },
    specialDescription: { type: String },
  },
  { _id: false },
);

export default mongoose.model("Condition", ConditionSchema);
