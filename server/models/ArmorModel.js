const mongoose = require("mongoose");

const ArmorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["light", "medium", "heavy", "shield", "natural"],
      required: true,
    },

    // Defense Stats
    armorRating: { type: Number, required: true }, // Base AR value
    shield: { type: Boolean, default: false }, // Is this a shield?

    // Physical Properties
    weight: { type: Number }, // in pounds
    value: { type: Number }, // in gold/currency
    material: {
      type: String,
      enum: [
        "cloth",
        "leather",
        "hide",
        "chainmail",
        "scale",
        "plate",
        "steel",
        "iron",
        "mithral",
        "adamantine",
        "dragonscale",
        "other",
      ],
    },
    rarity: {
      type: String,
      enum: [
        "common",
        "rare",
        "elite",
        "heroic",
        "epic",
        "legendary",
        "mythic",
      ],
      default: "common",
    },

    // Requirements & Penalties
    requirements: {
      strength: { type: Number, default: 0 },
      proficiency: [String], // e.g., ["light armor", "medium armor"]
      level: { type: Number, default: 1 },
    },
    stealthDisadvantage: { type: Boolean, default: false },

    // Armor Properties
    properties: [
      {
        type: String,
        enum: [
          "magical",
          "blessed",
          "cursed",
          "lightweight",
          "heavyweight",
          "enchanted",
          "masterwork",
          "reinforced",
        ],
      },
    ],

    // Additional tags for custom properties
    tags: [String],

    // Special Abilities
    special: { type: String }, // Description of special properties
    resistances: [String], // Damage types this armor provides resistance to
    skills: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Armor", ArmorSchema);
