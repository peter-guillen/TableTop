import dotenv from "dotenv";
import mongoose from "mongoose";
import Spell from "../domains/spells/spell.model.js";
import { STATS } from "../shared/constants/constants.js";
// TODO: export SPELLS (array of canonical spell names) from constants.js
// to re-enable the drift guard in seedSpells() below.
// import { STATS, SPELLS } from "../modules/constants/constants.js";
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

const spellSeeds = [
  {
    name: "Fireball",
    school: "evocation",
    tier: 3,
    effectType: ["damage"],
    damageType: ["fire"],
    healthEffects: [
      {
        direction: "damage",
        diceCount: 8,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    casting: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0, // instantaneous
      stamina: 15,
    },
    recharge: "unlimited",
    targeting: {
      targetCategory: "point",
      targetCount: 1,
      range: 120,
      shape: "sphere",
      size: 20,
    },
    offensiveStat: STATS.DOMINANCE,
    description:
      "A roaring ball of fire erupts at the target point, engulfing all within range.",
  },

  // 2. Persistent damage over time — exercises HealthEffect's durationType/duration
  {
    name: "Ignite",
    school: "evocation",
    tier: 1,
    effectType: ["damage"],
    damageType: ["fire"],
    healthEffects: [
      {
        direction: "damage",
        flat: 4,
        persistent: true,
        durationType: "turns",
        duration: 3,
      },
    ],
    statModifiers: [],
    conditions: [],
    casting: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 3, // 3 turns
      stamina: 6,
    },
    recharge: "unlimited",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 30,
    },
    offensiveStat: STATS.ACCURACY,
    description: "The target is set ablaze, taking burning damage each turn.",
  },

  // 3. Healing spell — flat healing, no offensiveStat (healers don't roll to hit)
  {
    name: "Cure Wounds",
    school: "abjuration",
    tier: 1,
    effectType: ["healing"],
    damageType: ["light"],
    healthEffects: [
      {
        direction: "healing",
        diceCount: 2,
        diceSize: 8,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    casting: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0, // instantaneous
      stamina: 8,
    },
    recharge: "unlimited",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5, // touch
    },
    description:
      "A warm light knits wounds closed, restoring health to the target.",
  },

  // 4. Self-buff — exercises StatModifier, no healthEffects, no offensiveStat
  {
    name: "Elemental Ward",
    school: "abjuration",
    tier: 2,
    effectType: ["buff"],
    damageType: ["earth"],
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
    casting: {
      action: "reaction",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 1, // 1 turn
      stamina: 10,
    },
    recharge: "short_rest",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 0, // self
    },
    description:
      "A shimmering barrier of raw element briefly hardens the caster's resolve.",
  },

  // 5. Debuff + condition together — exercises statModifiers and conditions co-occurring
  {
    name: "Weaken",
    school: "necromancy",
    tier: 2,
    effectType: ["debuff", "control"],
    damageType: ["dark"],
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
        condition: CONDITION_IDS.frightened, // adjust if a different condition was intended
        durationType: "turns",
        duration: 2,
      },
    ],
    casting: {
      action: "major_action",
      ritual: false,
      concentration: true,
      channel: false,
      castTime: 0,
      duration: 2, // 2 turns
      stamina: 9,
    },
    recharge: "unlimited",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 60,
    },
    offensiveStat: STATS.ACCURACY,
    description: "A draining curse leaves the target frail and slow to act.",
  },

  // 6. Pure utility — exercises the "none of the combat fields" path entirely
  {
    name: "Light",
    school: "conjuration",
    tier: 1,
    effectType: ["utility"],
    damageType: ["light"],
    healthEffects: [],
    statModifiers: [],
    conditions: [],
    casting: {
      action: "major_action",
      ritual: true,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 60, // placeholder — confirm your duration unit convention
      stamina: 2,
    },
    recharge: "unlimited",
    targeting: {
      targetCategory: "object",
      targetCount: 1,
      range: 5, // touch
      shape: "sphere",
      size: 20,
    },
    description:
      "Causes an object to glow, shedding bright light in a 20ft radius.",
  },
];

export const seedSpells = async () => {
  // Drift guard — uncomment once SPELLS is exported from constants.js
  // const seededNames = spellSeeds.map((s) => s.name);
  // const missing = SPELLS.filter((name) => !seededNames.includes(name));
  // if (missing.length > 0) {
  //   console.warn(
  //     `Warning: SPELLS has entries with no seed data: ${missing.join(", ")}`,
  //   );
  // }

  await Spell.deleteMany({});
  const created = await Spell.insertMany(spellSeeds);
  console.log(`Seeded ${created.length} spells.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedSpells)
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
