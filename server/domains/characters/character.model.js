import mongoose, { Schema } from "mongoose";

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
      affinity: { type: Schema.Types.ObjectId, ref: "Affinity" },
    },

    progression: {
      level: { type: Number, default: 1, min: 1 },
    },

    stats: {
      passive: {
        might: { type: Number, default: 0 },
        resilience: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
        evasion: { type: Number, default: 0 },
        dominance: { type: Number, default: 0 },
        resolve: { type: Number, default: 0 },
      },
      resources: {
        hp: Number,
        mp: Number,
        momentum: { type: Number, default: 5, min: 0 },
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

    skills: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Character", characterSchema);
