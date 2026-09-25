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
      enum: ["weapon", "armor", "accessory", "trinket", "consumable"],
      // accessory is any item that a player can equip but not of the main two
      // trinket is an item that is a like a consumable but is rechargeable
      required: true,
    },

    handedness: {
      type: String,
      enum: [
        "one_handed",
        "two_handed",
        "main_hand_only",
        "off_hand_only",
        "versatile",
      ],
    },

    rarity: { type: String, enum: Object.values(RARITY) },
    quality: [{ type: String, enum: Object.values(QUALITY) }],
    materials: [{ type: String, enum: Object.values(MATERIALS) }],
    properties: [{ type: String, enum: Object.values(PROPERTIES) }],
    value: { type: Number, default: 0 },

    healthEffects: [
      {
        direction: { type: String, enum: ["damage", "healing"] },
        damageType: { type: String, enum: Object.values(DAMAGE_TYPES) },
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
        damageType: {
          type: String,
          enum: Object.values(DAMAGE_TYPES),
          required: true,
        },
        rule: {
          type: String,
          enum: ["resistance", "vulnerability", "immunity", "absorption"],
          required: true,
        },
      },
    ],

    grantedPowers: [
      {
        power: { type: mongoose.Schema.Types.ObjectId, ref: "Power" },
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

    uniqueSkills: { type: [String], default: [] },
    requirements: {
      minLevel: Number,
      requiredTraits: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Power",
        default: [],
      },
    },
  },
  { timestamps: true },
);

ItemSchema.pre("validate", function (next) {
  if (this.category === "weapon" && !this.handedness) {
    return next(new Error("handedness is required for category 'weapon'"));
  }
  next();
});

export default mongoose.model("Item", ItemSchema);
