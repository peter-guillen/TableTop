import mongoose from "mongoose";
import { STATS } from "../constants/constants.js";

const StatModifierSchema = new mongoose.Schema(
  {
    stat: { type: String, enum: STATS, required: true },
    value: { type: Number, required: true },
    duration: { type: String },
    target: { type: String, enum: ["self", "enemy", "ally"] },
    description: { type: String },
  },
  { _id: false },
);

export default StatModifierSchema;
