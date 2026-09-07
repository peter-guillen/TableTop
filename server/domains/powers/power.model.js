import mongoose from "mongoose";
import {
  STATS,
  OFFENSIVE_STATS,
  DAMAGE_TYPES,
} from "../../shared/constants/constants.js";

const PowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    kind: {
      type: String,
      enum: ["spell", "technique", "ability", "trait"],
      required: true,
    },
    description: { type: String, required: true },

    // Spell-only
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
    },

    // Trait-only
    grantedPowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Power" }],

    targeting: {
      targetCategory: { type: String, enum: ["creature", "object", "point"] },
      targetCount: { type: Number, default: 1 },
      range: Number,
      shape: {
        type: String,
        enum: ["sphere", "cone", "line", "cube", "wall", "cylinder"],
      },
      size: Number,
    },

    healthEffects: [
      {
        direction: { type: String, enum: ["damage", "healing"] },
        damageType: { type: String, enum: DAMAGE_TYPES },
        diceSize: Number,
        diceCount: Number,
        flat: Number,
        persistent: { type: Boolean, default: false },
        durationType: {
          type: String,
          enum: ["turns", "until_broken", "permanent"],
        },
        duration: Number,
      },
    ],

    statModifiers: [
      {
        stat: { type: String, enum: Object.values(STATS), required: true },
        value: { type: Number, required: true },
        durationType: {
          type: String,
          enum: ["turns", "until_broken", "permanent"],
        },
        duration: Number,
        target: String,
        description: String,
      },
    ],

    conditions: [
      {
        condition: { type: mongoose.Schema.Types.ObjectId, ref: "Condition" },
        durationType: {
          type: String,
          enum: ["turns", "until_broken", "permanent"],
        },
        duration: Number,
      },
    ],

    activation: {
      action: {
        type: String,
        enum: ["major_action", "minor_action", "reaction"],
      },
      ritual: { type: Boolean, default: false },
      concentration: { type: Boolean, default: false },
      channel: { type: Boolean, default: false },
      castTime: { type: Number, default: 0 },
      duration: Number,
      resource: { type: String, enum: ["hp", "mp", "momentum"] },
      cost: Number,
    },

    recharge: {
      type: String,
      enum: ["unlimited", "short_rest", "long_rest", "daily"],
      default: "unlimited",
    },

    offensiveStat: { type: String, enum: OFFENSIVE_STATS },

    requirements: {
      minLevel: Number,
      requiredTraits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Power" }],
      weaponTags: [String],
    },
  },
  { timestamps: true },
);

// PowerSchema.pre("validate", async function (next) {
//   if (this.kind !== "spell" && this.school) {
//     return next(new Error(`${this.kind} documents cannot declare a school`));
//   }
//   if (this.kind === "spell" && !this.school) {
//     return next(new Error("Spell documents require a school"));
//   }

//   if (
//     this.kind === "technique" &&
//     (!this.requirements?.weaponTags ||
//       this.requirements.weaponTags.length === 0)
//   ) {
//     return next(
//       new Error("Technique documents require at least one weapon tag"),
//     );
//   }

//   if (this.kind !== "technique" && this.requirements?.weaponTags?.length > 0) {
//     return next(new Error(`${this.kind} documents cannot declare weaponTags`));
//   }

//   if (this.kind !== "trait" && this.grantedPowers?.length > 0) {
//     return next(
//       new Error(`${this.kind} documents cannot declare grantedPowers`),
//     );
//   }

//   // next(new Error());
// });

PowerSchema.pre("validate", function () {
  if (this.kind !== "spell" && this.school) {
    throw new Error(`${this.kind} documents cannot declare a school`);
  }
  if (this.kind === "spell" && !this.school) {
    throw new Error("Spell documents require a school");
  }
  if (
    this.kind === "technique" &&
    (!this.requirements?.weaponTags ||
      this.requirements.weaponTags.length === 0)
  ) {
    throw new Error("Technique documents require at least one weapon tag");
  }
  if (this.kind !== "technique" && this.requirements?.weaponTags?.length > 0) {
    throw new Error(`${this.kind} documents cannot declare weaponTags`);
  }
  if (this.kind !== "trait" && this.grantedPowers?.length > 0) {
    throw new Error(`${this.kind} documents cannot declare grantedPowers`);
  }
});

export default mongoose.model("Power", PowerSchema);
