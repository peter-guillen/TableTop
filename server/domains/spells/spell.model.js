import mongoose from "mongoose";

import Condition from "../../shared/schemas/conditionSchema.js";
import HealthEffectsSchema from "../../shared/schemas/healthEffectSchema.js";
import StatModifierSchema from "../../shared/schemas/statModiferSchema.js";

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
        "evocation",
        "abjuration",
        "conjuration",
        "divination",
        "enchantment",
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
    element: {
      type: String,
      enum: ["fire", "water", "air", "earth", "light", "dark"],
      required: true,
    },
    tags: [
      {
        type: String,
        enum: ["damage", "healing", "buff", "debuff", "control", "utility"],
      },
    ],
    castingTime: {
      type: String,
      required: true,
    },
    isRitual: {
      type: Boolean,
      default: false,
    },
    stamina: {
      type: Number,
      required: true,
    },
    usesPerDay: {
      type: String,
      enum: ["daily", "unlimited", "short_rest", "long_rest"],
    },
    range: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      default: 0,
    },
    target: {
      type: String,
      enum: ["single", "multiple", "self", "point", "area"],
    },
    attackType: {
      type: String,
      enum: ["spell_attack", "saving_throw", "auto_hit"],
    },
    // saveType: {
    //   type: String,
    //   enum: ["fortitude", "resolve", "avoidance"],
    // },
    duration: {
      type: String,
      required: true,
    },
    requiresConcentration: {
      type: Boolean,
      default: false,
    },
    // damage: [
    //   {
    //     diceCount: Number,
    //     diceSize: Number,
    //     modifier: {
    //       type: Number,
    //       default: 0,
    //     },
    //   },
    // ],
    // healing: [
    //   {
    //     diceCount: Number,
    //     diceSize: Number,
    //     modifier: {
    //       type: Number,
    //       default: 0,
    //     },
    //   },
    // ],
    healthEffects: [HealthEffectsSchema], // Handles damage or healing amounts and application type
    statModifiers: [StatModifierSchema], // Handles buffs or debuffs and application type
    conditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Condition" }], // Conditions applied may be in conjunction with buffs or debuffs but remains independent
    // buffs: [
    //   {
    //     stat: String,
    //     value: String,
    //     duration: String,
    //   },
    // ],
    // debuffs: [
    //   {
    //     stat: String,
    //     value: String,
    //     duration: String,
    //   },
    // ],
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
