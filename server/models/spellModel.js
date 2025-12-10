const mongoose = require("mongoose");

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
    damage: [
      {
        diceCount: Number,
        diceSize: Number,
        modifier: {
          type: Number,
          default: 0,
        },
      },
    ],
    healing: [
      {
        diceCount: Number,
        diceSize: Number,
        modifier: {
          type: Number,
          default: 0,
        },
      },
    ],
    conditions: [
      {
        type: String,
        enum: [
          "burning",
          "stunned",
          "poisoned",
          "blinded",
          "deafened",
          "paralyzed",
          "frozen",
          "shocked",
          "rooted",
          "slowed",
        ],
      },
    ],
    buffs: [
      {
        stat: String,
        value: String,
        duration: String,
      },
    ],
    debuffs: [
      {
        stat: String,
        value: String,
        duration: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spell", SpellSchema);
