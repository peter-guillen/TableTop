import mongoose from "mongoose";
import {
  DAMAGE_TYPES,
  RARITY,
  MATERIALS,
  QUALITY,
  PROPERTIES,
} from "../../shared/constants/constants.js";
import { StatModifierSchema } from "../../shared/schemas/statModifierSchema.js";

const WeaponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },

    category: {
      type: String,
      enum: ["melee", "ranged", "magic"],
      required: true,
    },

    damageType: [{ type: String, enum: DAMAGE_TYPES, required: true }],

    properties: [{ type: String, enum: PROPERTIES }],
    materials: [{ type: String, enum: MATERIALS }],
    quality: [{ type: String, enum: QUALITY }],

    rarity: { type: String, enum: RARITY, default: "common" },
    statModifiers: [StatModifierSchema],

    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Spell" }],
    uniqueSkills: [{ type: String }],

    value: { type: Number },
  },
  { timestamps: true },
);

export default mongoose.model("Weapon", WeaponSchema);
