import mongoose from "mongoose";

import { HealthEffectSchema } from "../../shared/schemas/healthEffectSchema.js";
import { StatModifierSchema } from "../../shared/schemas/statModifierSchema.js";
import { OFFENSIVE_STATS } from "../../shared/constants/constants.js";

export const SpellConditionSchema = new mongoose.Schema(
  {
    condition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condition",
    },
    durationType: {
      type: String,
      enum: ["turns", "until_broken", "permanent"],
    },
    duration: { type: Number }, // only when durationType === "turns"
  },
  { _id: false },
);

const SpellSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    school: {
      type: String,
      enum: [
        "abjuration",
        "conjuration",
        "divination",
        "enchantment",
        "evocation",
        "illusion",
        "necromancy",
        "transmutation",
      ],
      required: true,
    },
    tier: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    effectType: [
      {
        type: String,
        enum: [
          "damage",
          "healing",
          "buff",
          "debuff",
          "control",
          "utility",
          "summon",
        ],
      },
    ],
    damageType: {
      type: [
        {
          type: String,
          enum: ["fire", "water", "air", "earth", "light", "dark"],
        },
      ],
      required: true,
    },

    healthEffects: [HealthEffectSchema], // Handles damage or healing amounts and application type
    statModifiers: [StatModifierSchema], // Handles buffs or debuffs and application type
    conditions: [SpellConditionSchema], // Conditions applied may be in conjunction with buffs or debuffs but remains independent

    casting: {
      action: {
        type: String,
        enum: ["major_action", "minor_action", "reaction"],
        required: true,
      },
      ritual: {
        type: Boolean,
        default: false,
      },
      concentration: {
        type: Boolean,
        default: false,
      },
      channel: {
        type: Boolean,
        default: false,
      },
      castTime: {
        type: Number,
        default: 0,
      },
      duration: {
        type: Number,
        required: true,
      },
      stamina: {
        type: Number,
      },
    },

    recharge: {
      type: String,
      enum: ["unlimited", "short_rest", "long_rest", "daily"],
      default: "unlimited",
    },

    targeting: {
      targetCategory: {
        type: String,
        enum: ["creature", "object", "point"],
        required: true,
      },
      targetCount: {
        type: Number,
        default: 1,
      },
      range: {
        type: Number,
        required: true,
      },
      shape: {
        type: String,
        enum: ["sphere", "cone", "line", "cube", "wall", "cylinder"],
      },
      size: {
        type: Number,
      },
    },

    offensiveStat: {
      type: String,
      enum: OFFENSIVE_STATS,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Spell", SpellSchema);
