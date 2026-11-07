import mongoose, { Schema } from "mongoose";
import {
  SKILLS,
  MAX_LEVEL,
  BASE_POWER_SLOTS,
} from "../../shared/constants/constants.js";

const characterSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    identity: {
      name: { type: String, required: true, trim: true },
      age: Number,
      subjectPronoun: String,
      objectPronoun: String,
      portrait: String,
    },

    origin: {
      species: { type: Schema.Types.ObjectId, ref: "Species" },
      background: { type: Schema.Types.ObjectId, ref: "Background" },
    },

    mode: { type: String, enum: ["classed", "classless"], required: true },

    archetype: {
      profession: { type: Schema.Types.ObjectId, ref: "Profession" },
    },

    progression: {
      level: { type: Number, default: 1, min: 1, max: MAX_LEVEL },
      // Highest level whose rewards have been applied; below `level` means rewards are pending
      claimedLevel: { type: Number, default: 0, min: 0, max: MAX_LEVEL },
      powerSlots: {
        spells: { type: Number, default: BASE_POWER_SLOTS, min: 0 },
        abilities: { type: Number, default: BASE_POWER_SLOTS, min: 0 },
        traits: { type: Number, default: BASE_POWER_SLOTS, min: 0 },
      },
    },

    stats: {
      passive: {
        might: { type: Number, default: 0 },
        resilience: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
        evasion: { type: Number, default: 0 },
        dominance: { type: Number, default: 0 },
        resolve: { type: Number, default: 0 },
        movement: { type: Number, default: 0 },
        initiative: { type: Number, default: 0 },
      },
      resources: {
        hp: { type: Number, min: 0 },
        hpMax: { type: Number, min: 0 },
        mp: { type: Number, min: 0 },
        mpMax: { type: Number, min: 0 },
        mom: { type: Number, default: 5, min: 0 },
        momMax: { type: Number, default: 5, min: 0 },
      },
    },

    inventory: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],

    equipment: {
      weapons: {
        mainHand: { type: Schema.Types.ObjectId, ref: "Item", default: null },
        offHand: { type: Schema.Types.ObjectId, ref: "Item", default: null },
      },
      armor: { type: Schema.Types.ObjectId, ref: "Item", default: null },
      accessories: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    },

    powers: {
      spells: [{ type: Schema.Types.ObjectId, ref: "Power" }],
      traits: [{ type: Schema.Types.ObjectId, ref: "Power" }],
      abilities: [{ type: Schema.Types.ObjectId, ref: "Power" }],
    },

    skills: {
      type: [{ type: String, enum: Object.values(SKILLS) }],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Character", characterSchema);
