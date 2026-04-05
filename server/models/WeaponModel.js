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

// const mongoose = require("mongoose");

// const WeaponSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, default: "" },

//     // Combat Stats
//     damage: { type: String, required: true }, // e.g., "1d8", "2d6"
//     damageType: {
//       type: String,
//       enum: ["slashing", "piercing", "bludgeoning"],
//       required: true,
//     },
//     range: { type: String }, // e.g., "5 ft", "20/60 ft"

//     // Combat Identity
//     style: {
//       type: String,
//       enum: ["finesse", "power", "guard", "ranged", "exotic"],
//       required: true,
//     },
//     size: {
//       type: String,
//       enum: ["light", "medium", "heavy"],
//       required: true,
//     },

//     // Weapon Properties (used for technique eligibility)
//     properties: [
//       {
//         type: String,
//         enum: [
//           "reach",
//           "thrown",
//           "versatile",
//           "two-handed",
//           "loading",
//           "special",
//           "silvered",
//           "adamantine",
//           "magical",
//         ],
//       },
//     ],

//     // Rarity / Meta
//     rarity: {
//       type: String,
//       enum: [
//         "common",
//         "uncommon",
//         "rare",
//         "very rare",
//         "legendary",
//         "artifact",
//       ],
//       default: "common",
//     },
//     value: { type: Number },
//     weight: { type: Number },

//     // Unique techniques locked to this specific weapon
//     uniqueTechniques: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "Technique" },
//     ],
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Weapon", WeaponSchema);

// const TechniqueSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     staminaCost: { type: Number, default: 0 },
//     actionType: {
//       type: String,
//       enum: ["major", "minor", "reaction", "passive"],
//       required: true,
//     },

//     // Technique eligibility — all specified fields must match the equipped weapon
//     // Omitting a field means no restriction on that property
//     requirements: {
//       style: [
//         {
//           type: String,
//           enum: ["finesse", "power", "guard", "ranged", "exotic"],
//         },
//       ],
//       damageType: [
//         { type: String, enum: ["slashing", "piercing", "bludgeoning"] },
//       ],
//       size: [{ type: String, enum: ["light", "medium", "heavy"] }],
//       properties: [{ type: String }], // weapon must have ALL listed properties
//     },

//     // If set, this technique is locked to one specific weapon
//     weaponId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Weapon",
//       default: null,
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Technique", TechniqueSchema);
