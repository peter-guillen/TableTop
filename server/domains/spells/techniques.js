import mongoose from "mongoose";

// Was SpellConditionSchema — generalized since Technique needs the exact same shape.
// A condition is always authored explicitly on whatever applies it (Spell or
// Technique); it is never derived automatically from a damage type.
export const ConditionSchema = new mongoose.Schema(
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

import mongoose from "mongoose";

// Shared across Spell, Power, and Technique — "how does this thing reach its target."
// No model-specific concepts belong in here; if a field only makes sense for one
// model, it doesn't belong on this schema.
export const TargetingSchema = new mongoose.Schema(
  {
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
  { _id: false },
);

import mongoose from "mongoose";

import { HealthEffectSchema } from "../../shared/schemas/healthEffectSchema.js";
import { StatModifierSchema } from "../../shared/schemas/statModifierSchema.js";
import { ConditionSchema } from "../../shared/schemas/conditionSchema.js";
import { TargetingSchema } from "../../shared/schemas/targetingSchema.js";
import {
  EFFECT_TYPES,
  OFFENSIVE_STATS,
  WEAPON_CATEGORIES,
  WEAPON_PROPERTIES,
} from "../../shared/constants/constants.js";

// Adjust the relative import depth above to match wherever this file actually
// lives in the domain tree — written assuming the same nesting as Spell's model file.

// Which weapons can equip/unlock this Technique. This is the one piece of shape
// that Spell has no equivalent of at all, so it's kept as its own embedded
// sub-schema rather than folded into the shared base fields above.
const WeaponEligibilitySchema = new mongoose.Schema(
  {
    // OR-match assumption: a weapon qualifies if it has ANY of these tags,
    // not ALL of them. Flagging this because it's not stated anywhere yet —
    // confirm before relying on it, since AND-matching is an equally valid
    // reading and would need different query logic.
    category: {
      type: [String],
      enum: WEAPON_CATEGORIES, // ["melee", "ranged", "magic"]
    },
    properties: {
      type: [String],
      enum: WEAPON_PROPERTIES, // finesse, heavy, light, loading, reach, thrown, two-handed
    },
    // Set only for weapon-exclusive Techniques (Excalibur's signature move).
    // When present, this should short-circuit category/properties matching
    // entirely rather than being combined with them.
    weaponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Weapon",
      default: null,
    },
  },
  { _id: false },
);

const TechniqueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

    // Each healthEffects entry carries its own damageType. A null damageType
    // on an entry is NOT "forgot to fill this in" — it means "inherit from
    // whatever weapon is currently equipped," resolved at use-time.
    //   Blitz:  [{ dice: "2d6", damageType: null }]
    //   Charge: [{ dice: "1d4", damageType: null },
    //            { dice: "1d4", damageType: "bludgeoning" }]
    //   Mach Strike: [{ dice: "3d6", damageType: "force" }]
    // If the resolved weapon has more than one damageType (e.g. Excalibur =
    // slashing + light), the player picks which one applies — that's a rules
    // rule, not something this schema enforces.
    healthEffects: [HealthEffectSchema],
    statModifiers: [StatModifierSchema],
    conditions: [ConditionSchema],

    targeting: {
      type: TargetingSchema,
      required: true,
    },

    recharge: {
      type: String,
      enum: ["unlimited", "short_rest", "long_rest", "daily"],
      default: "unlimited",
    },

    action: {
      type: String,
      enum: ["major_action", "minor_action", "reaction"],
      required: true,
    },

    // No momentumCost / manaCost-equivalent field — Momentum is a pure
    // action-economy resource, not a per-Technique spend.
    concentration: {
      type: Boolean,
      default: false,
    },

    offensiveStat: {
      type: String,
      enum: OFFENSIVE_STATS,
    },

    weaponEligibility: {
      type: WeaponEligibilitySchema,
      required: true,
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

export default mongoose.model("Technique", TechniqueSchema);

import mongoose from "mongoose";

// Was SpellConditionSchema — generalized since Technique needs the exact same shape.
// A condition is always authored explicitly on whatever applies it (Spell or
// Technique); it is never derived automatically from a damage type.
export const ConditionSchema = new mongoose.Schema(
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

import mongoose from "mongoose";

// Shared across Spell, Power, and Technique — "how does this thing reach its target."
// No model-specific concepts belong in here; if a field only makes sense for one
// model, it doesn't belong on this schema.
export const TargetingSchema = new mongoose.Schema(
  {
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
  { _id: false },
);

import mongoose from "mongoose";

import { HealthEffectSchema } from "../../shared/schemas/healthEffectSchema.js";
import { StatModifierSchema } from "../../shared/schemas/statModifierSchema.js";
import { ConditionSchema } from "../../shared/schemas/conditionSchema.js";
import { TargetingSchema } from "../../shared/schemas/targetingSchema.js";
import {
  OFFENSIVE_STATS,
  WEAPON_CATEGORIES,
  WEAPON_PROPERTIES,
} from "../../shared/constants/constants.js";

// Adjust the relative import depth above to match wherever this file actually
// lives in the domain tree — written assuming the same nesting as Spell's model file.

// Which weapons can equip/unlock this Technique. This is the one piece of shape
// that Spell has no equivalent of at all, so it's kept as its own embedded
// sub-schema rather than folded into the shared base fields above.
const WeaponEligibilitySchema = new mongoose.Schema(
  {
    // OR-match assumption: a weapon qualifies if it has ANY of these tags,
    // not ALL of them. Flagging this because it's not stated anywhere yet —
    // confirm before relying on it, since AND-matching is an equally valid
    // reading and would need different query logic.
    category: {
      type: [String],
      enum: WEAPON_CATEGORIES, // ["melee", "ranged", "magic"]
    },
    properties: {
      type: [String],
      enum: WEAPON_PROPERTIES, // finesse, heavy, light, loading, reach, thrown, two-handed
    },
    // Set only for weapon-exclusive Techniques (Excalibur's signature move).
    // When present, this should short-circuit category/properties matching
    // entirely rather than being combined with them.
    weaponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Weapon",
      default: null,
    },
  },
  { _id: false },
);
