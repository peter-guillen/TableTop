import mongoose from "mongoose";
import { STATS } from "../constants/constants.js";

export const StatModifierSchema = new mongoose.Schema(
  {
    stat: { type: String, enum: Object.values(STATS), required: true },
    value: { type: Number, required: true },
    durationType: {
      type: String,
      enum: ["turns", "until_broken", "permanent"],
    },
    duration: { type: Number },
    target: { type: String },
    description: { type: String },
  },
  { _id: false },
);
