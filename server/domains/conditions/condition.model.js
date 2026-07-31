import mongoose from "mongoose";
import { CONDITIONS } from "../../shared/constants/constants.js";

const ConditionSchema = new mongoose.Schema({
  name: { type: String, enum: CONDITIONS, required: true },
  description: { type: String },
});

export default mongoose.model("Condition", ConditionSchema);
