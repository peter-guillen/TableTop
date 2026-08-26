import mongoose, { Schema } from "mongoose";

const characterSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    identity: {
      name: { type: String, required: true },
      age: Number,
      pronouns: String,
    },

    origin: {
      species: { type: Schema.Types.ObjectId, ref: "Species" },
      background: { type: Schema.Types.ObjectId, ref: "Background" },
    },

    archetype: {
      profession: { type: Schema.Types.ObjectId, ref: "Profession" },
      professionSub: { type: Schema.Types.ObjectId, ref: "Profession" },
      affinity: { type: Schema.Types.ObjectId, ref: "Affinity" },
      affinitySub: { type: Schema.Types.ObjectId, ref: "Affinity" },
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
        momentum: { type: Number, default: 3, min: 0 },
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
      accessories: { type: [Schema.Types.ObjectId], ref: "Item", default: [] },
    },

    powers: {
      spells: { type: [Schema.Types.ObjectId], ref: "Power", default: [] },
      traits: { type: [Schema.Types.ObjectId], ref: "Power", default: [] },
      abilities: { type: [Schema.Types.ObjectId], ref: "Power", default: [] },
    },

    skills: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Character", characterSchema);
