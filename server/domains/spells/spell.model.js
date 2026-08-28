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

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// Assumes these sub-schemas are defined/imported elsewhere in your codebase:
// TargetingSchema, RequirementsSchema, SpellSchema, TechniquesSchema, AbilitiesSchema, TraitsSchema
// const TargetingSchema = require("./TargetingSchema");
// const SpellSchema = require("./SpellSchema");
// const TechniquesSchema = require("./TechniquesSchema");
// const AbilitiesSchema = require("./AbilitiesSchema");
// const TraitsSchema = require("./TraitsSchema");

const KIND_FIELD_MAP = {
  spell: "spells",
  technique: "techniques",
  ability: "abilities",
  trait: "traits",
};

// const PowersSchema = new Schema({
//   kind: {
//     type: String,
//     enum: Object.keys(KIND_FIELD_MAP), // ["spell", "technique", "ability", "trait"]
//     required: true,
//   },

//   basicFields: {
//     name: String,
//     description: String,
//   },

//   conditions: { type: [Schema.Types.ObjectId], ref: "Conditions" },
//   healthEffects: { type: [Schema.Types.ObjectId], ref: "HealthEffects" },

//   usage: { cost: Number },
//   targeting: TargetingSchema,

//   // Exactly one of these four should be populated per document —
//   // enforced below in the pre("validate") hook, not by the schema shape itself.
//   spells: SpellSchema,
//   techniques: TechniquesSchema,
//   abilities: AbilitiesSchema,
//   traits: TraitsSchema,
// });

// // Fast lookups for Power.find({ kind: "spell" }) / Power.find({ kind: "ability" }) etc.
// PowersSchema.index({ kind: 1 });

// PowersSchema.pre("validate", function (next) {
//   const allFields = Object.values(KIND_FIELD_MAP);
//   const populatedFields = allFields.filter((field) => this[field] != null);

//   // --- Invariant 1: exactly one type sub-field must be populated ---
//   if (populatedFields.length !== 1) {
//     return next(
//       new Error(
//         `Power must have exactly one of [${allFields.join(", ")}] populated, found: [${
//           populatedFields.join(", ") || "none"
//         }]`
//       )
//     );
//   }

//   // --- Invariant 2: the populated field must match the declared kind ---
//   const expectedField = KIND_FIELD_MAP[this.kind];
//   if (populatedFields[0] !== expectedField) {
//     return next(
//       new Error(
//         `Power.kind is "${this.kind}" but "${populatedFields[0]}" is populated instead of "${expectedField}"`
//       )
//     );
//   }

//   // --- Invariant 3: per-kind rules beyond shape-matching ---
//   switch (this.kind) {
//     case "trait": {
//       // Traits are foundational/native grants — a Trait that itself requires
//       // another Trait would create a dependency chain the design doesn't want.
//       if (this.requirements?.requiredTraits?.length > 0) {
//         return next(
//           new Error("Trait documents cannot declare requiredTraits — traits are not gated behind other traits")
//         );
//       }
//       break;
//     }

//     case "ability": {
//       // Abilities are passive — no usage cost or targeting should apply.
//       if (this.usage?.cost != null) {
//         return next(new Error("Ability documents cannot have a usage cost — abilities are passive"));
//       }
//       if (this.targeting != null) {
//         return next(new Error("Ability documents cannot declare targeting — abilities have no target"));
//       }
//       break;
//     }

//     case "spell":
//     case "technique":
//       // No extra rules beyond the shared checks yet.
//       break;
//   }

//   next();
// });

// module.exports = mongoose.model("Power", PowersSchema);
