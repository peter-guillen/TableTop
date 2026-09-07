import dotenv from "dotenv";
import mongoose from "mongoose";
import Power from "../domains/powers/power.model.js";
import {
  STATS,
  OFFENSIVE_STATS,
  DAMAGE_TYPES,
} from "../shared/constants/constants.js";
import { fileURLToPath } from "url";

dotenv.config();

// Real Condition _ids seeded separately (conditions collection)
const CONDITION_IDS = {
  blinded: "6a6acc229f583a3359d9e97a",
  charmed: "6a6acc229f583a3359d9e97b",
  deafened: "6a6acc229f583a3359d9e97c",
  frightened: "6a6acc229f583a3359d9e97d",
  grappled: "6a6acc229f583a3359d9e97e",
  incapacitated: "6a6acc229f583a3359d9e97f",
  invisible: "6a6acc229f583a3359d9e980",
  paralyzed: "6a6acc229f583a3359d9e981",
  petrified: "6a6acc229f583a3359d9e982",
  poisoned: "6a6acc229f583a3359d9e983",
  prone: "6a6acc229f583a3359d9e984",
  restrained: "6a6acc229f583a3359d9e985",
  stunned: "6a6acc229f583a3359d9e986",
  unconscious: "6a6acc229f583a3359d9e987",
};

// These two placeholder ids stand in for Powers seeded earlier in this same
// array (Weaken/Guard below) so grantedPowers has something real to point at.
// Swap for real ObjectIds once seeding is chained off insertMany's return value.
const GRANTED_POWER_IDS = {
  weaken: "6a6acc229f583a3359d9e990",
  guard: "6a6acc229f583a3359d9e991",
};

const powerSeeds = [
  // 1. SPELL — requires `school`, everything else is the familiar Spell shape.
  //    Exercises: healthEffects (damage), offensiveStat, no requirements.
  {
    name: "Fireball",
    kind: "spell",
    school: "evocation",
    description:
      "A roaring ball of fire erupts at the target point, engulfing all within range.",
    targeting: {
      targetCategory: "point",
      targetCount: 1,
      range: 120,
      shape: "sphere",
      size: 20,
    },
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.FIRE,
        diceCount: 8,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    usage: { cost: 15 },
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0, // instantaneous
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.DOMINANCE,
    requirements: {},
  },

  // 2. SPELL — persistent damage over time, no offensiveStat (a DoT the target
  //    already failed a save against, not a fresh attack roll — adjust if your
  //    ruleset actually rolls to apply burning each turn).
  {
    name: "Ignite",
    kind: "spell",
    school: "evocation",
    description: "The target is set ablaze, taking burning damage each turn.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 30,
    },
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.FIRE,
        flat: 4,
        persistent: true,
        durationType: "turns",
        duration: 3,
      },
    ],
    statModifiers: [],
    conditions: [],
    usage: { cost: 6 },
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 3,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.ACCURACY,
    requirements: {},
  },

  // 3. TECHNIQUE — requires requirements.weaponTags, must NOT declare school.
  //    Weapon-derived damage: damageType omitted on the healthEffect entry so
  //    the combat resolver fills it in from the equipped weapon at time-of-use
  //    (per the null = weapon-derived convention).
  {
    name: "Blitz",
    kind: "technique",
    description:
      "A blindingly fast strike that relies on the weapon in hand rather than any fixed damage type.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5,
    },
    healthEffects: [
      {
        direction: "damage",
        // damageType intentionally omitted — resolves against the equipped weapon
        diceCount: 2,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    usage: { cost: 0 }, // Momentum-spent techniques have no staminaCost; adjust if this one does
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.ACCURACY,
    requirements: {
      weaponTags: ["light", "finesse"],
    },
  },

  // 4. TECHNIQUE — stacks a fixed-type instance (bludgeoning) alongside the
  //    weapon-derived one, plus a condition. Exercises multiple healthEffects
  //    entries and conditions co-occurring on a non-spell kind.
  {
    name: "Charge",
    kind: "technique",
    description:
      "The wielder closes distance in a burst of momentum, slamming into the target with weapon and body alike.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 15,
    },
    healthEffects: [
      {
        direction: "damage",
        // weapon-derived — damageType omitted
        diceCount: 1,
        diceSize: 4,
        persistent: false,
      },
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.BLUDGEONING,
        diceCount: 1,
        diceSize: 4,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [
      {
        condition: CONDITION_IDS.prone, // "apply dazed" in design notes — swap if Dazed exists as its own Condition doc
        durationType: "turns",
        duration: 1,
      },
    ],
    usage: { cost: 0 },
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.MIGHT,
    requirements: {
      weaponTags: ["heavy", "two-handed"],
    },
  },

  // 5. TECHNIQUE — fully independent fixed damage type, ignores the weapon
  //    entirely (Mach Strike pattern from design notes).
  {
    name: "Mach Strike",
    kind: "technique",
    description:
      "A strike delivered with such velocity it tears at the target through pure force, independent of the weapon used.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5,
    },
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.FORCE,
        diceCount: 3,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    usage: { cost: 0 },
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0,
    },
    recharge: "short_rest",
    offensiveStat: OFFENSIVE_STATS.ACCURACY,
    requirements: {
      weaponTags: ["reach"],
    },
  },

  // 6. ABILITY — no school, no weaponTags, no grantedPowers; a self-buff with
  //    stat modifiers only. Shows the "none of the kind-gated fields" path.
  {
    name: "Guard",
    kind: "ability",
    description:
      "A shimmering barrier of raw element briefly hardens the caster's resolve.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 0, // self
    },
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.RESOLVE,
        value: 5,
        durationType: "turns",
        duration: 1,
        description: "Bolsters resolve to shrug off an incoming spell.",
      },
    ],
    conditions: [],
    usage: { cost: 10 },
    activation: {
      action: "reaction",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 1,
    },
    recharge: "short_rest",
    requirements: {},
  },

  // 7. ABILITY — debuff + condition together, requiredTraits as a prerequisite
  //    (allowed on any kind — separate mechanic from grantedPowers).
  {
    name: "Weaken",
    kind: "ability",
    description: "A draining curse leaves the target frail and slow to act.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 60,
    },
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.MIGHT,
        value: -4,
        durationType: "turns",
        duration: 2,
        description: "Saps the target's physical power.",
      },
    ],
    conditions: [
      {
        condition: CONDITION_IDS.frightened,
        durationType: "turns",
        duration: 2,
      },
    ],
    usage: { cost: 9 },
    activation: {
      action: "major_action",
      ritual: false,
      concentration: true,
      channel: false,
      castTime: 0,
      duration: 2,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.ACCURACY,
    requirements: {
      minLevel: 3,
    },
  },

  // 8. TRAIT — the only kind allowed to populate grantedPowers. No school, no
  //    weaponTags. Grants tiered access to an existing Power by ref.
  {
    name: "Arms Master I",
    kind: "trait",
    description:
      "Rigorous weapon drilling grants proficiency with heavier arms than most can wield cleanly.",
    grantedPowers: [GRANTED_POWER_IDS.guard],
    targeting: {},
    healthEffects: [],
    statModifiers: [],
    conditions: [],
    usage: {},
    activation: {},
    recharge: "unlimited",
    requirements: {
      minLevel: 1,
    },
  },

  // 9. TRAIT — grants a second Power, chaining tiers (Arms Master I -> II),
  //    demonstrating a trait granting another trait.
  {
    name: "Arms Master II",
    kind: "trait",
    description:
      "Further mastery lets the wielder ignore the penalties heavy weapons usually impose.",
    grantedPowers: [GRANTED_POWER_IDS.weaken],
    targeting: {},
    healthEffects: [],
    statModifiers: [],
    conditions: [],
    usage: {},
    activation: {},
    recharge: "unlimited",
    requirements: {
      minLevel: 5,
      requiredTraits: [], // would ref Arms Master I's real _id once chained off insertMany
    },
  },
];

export const seedPowers = async () => {
  await Power.deleteMany({});
  const created = await Power.insertMany(powerSeeds);
  console.log(`Seeded ${created.length} powers.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedPowers)
    .then(() => {
      console.log(
        "Connected to:",
        mongoose.connection.name,
        mongoose.connection.host,
      );
      return mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
