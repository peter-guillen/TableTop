import mongoose from "mongoose";
import { STATS, DAMAGE_TYPES } from "../../shared/constants/constants.js";

// speciesSchema.js
const SpeciesSchema = new mongoose.Schema({
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
  resistances: [
    {
      damageType: { type: String, enum: DAMAGE_TYPES },
      rule: {
        type: String,
        enum: ["resistance", "vulnerability", "immunity", "absorption"],
      },
    },
  ],
  traits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Power" }],
});

export default mongoose.model("Species", SpeciesSchema);
