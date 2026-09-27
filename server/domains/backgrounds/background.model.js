import mongoose from "mongoose";
import { STATS, SKILLS } from "../../shared/constants/constants.js";

const BackgroundSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  statModifiers: [
    {
      stat: { type: String, enum: STATS },
      value: Number,
      durationType: String,
      duration: Number,
      target: String,
      description: String,
    },
  ],
  skillProficiencies: [{ type: String, enum: SKILLS }],
  startingItems: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    },
  ],
  traits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Power" }],
});

export default mongoose.model("Background", BackgroundSchema);
