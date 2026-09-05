import mongoose from "mongoose";
import {
  STATS,
  SKILLS,
  PROPERTIES,
  DAMAGE_TYPES,
  RARITY,
  QUALITY,
  MATERIALS,
} from "../../shared/constants/constants.js";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["weapon", "armor", "accessory", "consumable", "trinket"],
      required: true,
    },

    rarity: { type: String, enum: RARITY },
    quality: [{ type: String, enum: QUALITY }],
    materials: [{ type: String, enum: MATERIALS }],
    properties: [{ type: String, enum: PROPERTIES }],
    value: Number,

    healthEffects: [
      {
        direction: { type: String, enum: ["damage", "healing"] },
        damageType: { type: String, enum: DAMAGE_TYPES },
        diceSize: Number,
        diceCount: Number,
        flat: Number,
        persistent: { type: Boolean, default: false },
        durationType: {
          type: String,
          enum: ["turns", "until_broken", "permanent"],
        },
        duration: Number,
      },
    ],

    statModifiers: [
      {
        stat: {
          type: String,
          enum: [...Object.values(STATS), ...Object.values(SKILLS)],
          required: true,
        },
        value: { type: Number, required: true },
        durationType: {
          type: String,
          enum: ["turns", "until_broken", "permanent"],
        },
        duration: Number,
        target: String,
        description: String,
      },
    ],

    resistances: [
      {
        damageType: { type: String, enum: DAMAGE_TYPES, required: true },
        rule: {
          type: String,
          enum: ["resistance", "vulnerability", "immunity", "absorption"],
          required: true,
        },
      },
    ],

    grantedItems: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        recharge: {
          type: String,
          enum: ["unlimited", "none", "short_rest", "long_rest", "daily"],
        },
        usesPerRecharge: Number,
      },
    ],

    selfCharges: {
      usesRemaining: Number,
      recharge: {
        type: String,
        enum: ["none", "short_rest", "long_rest", "daily"],
      },
    },

    uniqueSkills: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Item", ItemSchema);
