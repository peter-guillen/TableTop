const mongoose = require("mongoose");
const {
  AFFINITIES,
  PROFESSIONS,
  STATS,
  SKILLS,
} = require("../utils/constants.js");

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["standard", "custom"],
      default: "standard",
      required: true,
    },
    stats: Object.fromEntries(
      Object.values(STATS).map((stat) => [stat, { type: Number, default: 0 }]),
    ),
    skills: Object.fromEntries(
      Object.values(SKILLS).map((skill) => [
        skill,
        { type: Number, default: 0 },
      ]),
    ),
    profession: {
      type: String,
      enum: PROFESSIONS,
    },
    professionLevel: {
      type: Number,
      min: 1,
      max: 10,
    },
    subProfession: {
      type: String,
      enum: PROFESSIONS,
    },
    subProfessionLevel: {
      type: Number,
      min: 1,
      max: 5,
    },
    experiencePoints: {
      type: Number,
      default: 0,
    },
    affinity: {
      type: String,
      enum: AFFINITIES,
    },

    traits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trait",
      },
    ],
    spells: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spell",
      },
    ],
    weapons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Weapon",
      },
    ],
    armors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Armor",
      },
    ],
    inventory: [
      {
        type: String,
      },
    ],
    notes: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Character", CharacterSchema);
