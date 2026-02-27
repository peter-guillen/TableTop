const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["simple", "martial", "exotic", "firearm", "ammunition"],
      required: true,
    },

    // Combat Stats
    damage: { type: String, required: true }, // e.g., "1d8", "2d6"
    damageType: {
      type: String,
      enum: [
        "slashing",
        "piercing",
        "bludgeoning",
        "fire",
        "cold",
        "lightning",
        "acid",
        "poison",
        "radiant",
        "necrotic",
        "force",
        "psychic",
        "thunder",
      ],
    },
    range: { type: String }, // e.g., "5 ft", "20/60 ft", "100/400 ft"

    // Physical Properties
    weight: { type: Number }, // in pounds
    value: { type: Number }, // in gold/currency
    rarity: {
      type: String,
      enum: [
        "common",
        "uncommon",
        "rare",
        "very rare",
        "legendary",
        "artifact",
      ],
      default: "common",
    },

    // Weapon Properties (tag system)
    properties: [
      {
        type: String,
        enum: [
          "ammunition",
          "finesse",
          "heavy",
          "light",
          "loading",
          "reach",
          "special",
          "thrown",
          "two-handed",
          "versatile",
          "silvered",
          "adamantine",
          "magical",
        ],
      },
    ],

    // Additional tags for custom properties
    tags: [String],

    // Requirements
    requirements: {
      strength: { type: Number, default: 0 },
      proficiency: [String], // e.g., ["martial weapons", "longswords"]
      level: { type: Number, default: 1 },
    },

    // Associated Skills
    skills: [String], // Skills that can be used with this weapon

    // Special Abilities
    special: { type: String }, // Description of special properties
  },
  { timestamps: true },
);

module.exports = mongoose.model("Weapon", WeaponSchema);
