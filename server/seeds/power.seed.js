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

const powerSeeds = [
  // 1. SPELL — requires `school`, everything else is the familiar Spell shape.
  //    Exercises: healthEffects (damage), offensiveStat, no requirements.
  //    Cost now lives on activation.resource/activation.cost, not a separate `usage` block.
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
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0, // instantaneous
      resource: "mp",
      cost: 15,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.DOMINANCE,
    requirements: {},
  },

  // 2. SPELL — persistent damage over time, no offensiveStat.
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
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 3,
      resource: "mp",
      cost: 6,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.ACCURACY,
    requirements: {},
  },

  // 3. TECHNIQUE — requires requirements.properties (renamed from weaponTags), must NOT declare school.
  //    Techniques spend Momentum, which isn't a schema resource (activation.resource is hp|mp only),
  //    so techniques get NO resource/cost on activation at all.
  //    Weapon-derived damage: damageType omitted so the combat resolver fills it in from the equipped weapon.
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
      properties: ["light", "finesse"],
    },
  },

  // 4. TECHNIQUE — stacks a fixed-type instance (bludgeoning) alongside the
  //    weapon-derived one, plus a condition.
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
      properties: ["heavy", "two-handed"],
    },
  },

  // 5. TECHNIQUE — fully independent fixed damage type, ignores the weapon entirely.
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
      properties: ["reach"],
    },
  },

  // ============================================================
  // SPELLS
  // ============================================================

  // 6. SPELL — low-power defensive reaction
  {
    name: "Aegis",
    kind: "spell",
    school: "abjuration",
    description:
      "A thin veil of arcane force flashes into existence, turning aside an incoming blow.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 30,
    },
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.RESILIENCE,
        value: 4,
        durationType: "turns",
        duration: 1,
        description: "Briefly hardens the target against incoming harm.",
      },
    ],
    conditions: [],
    activation: {
      action: "reaction",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 1,
      resource: "mp",
      cost: 5,
    },
    recharge: "unlimited",
    requirements: {},
  },

  // 7. SPELL — area control
  {
    name: "Frostbind",
    kind: "spell",
    school: "conjuration",
    description:
      "A burst of supernatural frost spreads across the ground, slowing creatures caught within it.",
    targeting: {
      targetCategory: "point",
      targetCount: 1,
      range: 60,
      shape: "sphere",
      size: 15,
    },
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.COLD,
        diceCount: 2,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [
      {
        condition: CONDITION_IDS.restrained,
        durationType: "turns",
        duration: 1,
      },
    ],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: true,
      channel: false,
      castTime: 0,
      duration: 1,
      resource: "mp",
      cost: 10,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.DOMINANCE,
    requirements: {},
  },

  // 8. SPELL — stronger single-target spell
  {
    name: "Thunder Lance",
    kind: "spell",
    school: "evocation",
    description:
      "A concentrated spear of lightning tears through the air and strikes a single target with explosive force.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 90,
    },
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.LIGHTNING,
        diceCount: 6,
        diceSize: 8,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0,
      resource: "mp",
      cost: 14,
    },
    recharge: "unlimited",
    offensiveStat: OFFENSIVE_STATS.DOMINANCE,
    requirements: {
      minLevel: 5,
    },
  },

  // 9. SPELL — healing
  {
    name: "Mending Light",
    kind: "spell",
    school: "evocation",
    description:
      "Warm radiance closes wounds and restores a portion of the target's vitality.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 30,
    },
    healthEffects: [
      {
        direction: "healing",
        flat: 12,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0,
      resource: "mp",
      cost: 8,
    },
    recharge: "unlimited",
    requirements: {},
  },

  // 10. SPELL — powerful but requires channeling
  {
    name: "Void Collapse",
    kind: "spell",
    school: "evocation",
    description:
      "The caster tears open a momentary distortion in space, crushing everything caught within its center.",
    targeting: {
      targetCategory: "point",
      targetCount: 1,
      range: 60,
      shape: "sphere",
      size: 25,
    },
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.FORCE,
        diceCount: 10,
        diceSize: 8,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: true,
      castTime: 1,
      duration: 0,
      resource: "mp",
      cost: 30,
    },
    recharge: "long_rest",
    offensiveStat: OFFENSIVE_STATS.DOMINANCE,
    requirements: {
      minLevel: 10,
    },
  },

  // ============================================================
  // TECHNIQUES
  // ============================================================

  // 11. TECHNIQUE — cheap defensive maneuver
  {
    name: "Deflect",
    kind: "technique",
    description:
      "The warrior turns an incoming attack aside with precise timing and controlled movement.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5,
    },
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.EVASION,
        value: 5,
        durationType: "turns",
        duration: 1,
        description: "Improves the user's ability to avoid the next attack.",
      },
    ],
    conditions: [],
    activation: {
      action: "reaction",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 1,
    },
    recharge: "unlimited",
    requirements: {
      properties: ["light", "finesse"],
    },
  },

  // 12. TECHNIQUE — heavy weapon burst
  {
    name: "Overhead Breaker",
    kind: "technique",
    description:
      "A devastating overhead swing crashes down with enough force to stagger even a heavily armored opponent.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5,
    },
    healthEffects: [
      {
        direction: "damage",
        diceCount: 4,
        diceSize: 8,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [
      {
        condition: CONDITION_IDS.stunned,
        durationType: "turns",
        duration: 1,
      },
    ],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 0,
    },
    recharge: "short_rest",
    offensiveStat: OFFENSIVE_STATS.MIGHT,
    requirements: {
      properties: ["heavy", "two-handed"],
      minLevel: 5,
    },
  },

  // 13. TECHNIQUE — mobility
  {
    name: "Reaping Step",
    kind: "technique",
    description:
      "The wielder sweeps past the enemy in a sudden step, striking as they move through the opening.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 10,
    },
    healthEffects: [
      {
        direction: "damage",
        diceCount: 2,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [],
    conditions: [],
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
      properties: ["light", "finesse"],
    },
  },

  // 14. TECHNIQUE — armor-breaking attack
  {
    name: "Armor Rend",
    kind: "technique",
    description:
      "A viciously placed strike exploits a weakness in the target's defenses.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5,
    },
    healthEffects: [
      {
        direction: "damage",
        diceCount: 3,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [
      {
        stat: STATS.RESILIENCE,
        value: -5,
        durationType: "turns",
        duration: 2,
        description:
          "Reduces the target's ability to withstand further attacks.",
      },
    ],
    conditions: [],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 2,
    },
    recharge: "short_rest",
    offensiveStat: OFFENSIVE_STATS.ACCURACY,
    requirements: {
      properties: ["heavy", "two-handed"],
      minLevel: 3,
    },
  },

  // 15. TECHNIQUE — high-level signature attack
  {
    name: "Executioner",
    kind: "technique",
    description:
      "The warrior commits completely to a single killing stroke, sacrificing defense for overwhelming force.",
    targeting: {
      targetCategory: "creature",
      targetCount: 1,
      range: 5,
    },
    healthEffects: [
      {
        direction: "damage",
        diceCount: 8,
        diceSize: 10,
        persistent: false,
      },
    ],
    statModifiers: [
      {
        stat: STATS.EVASION,
        value: -5,
        durationType: "turns",
        duration: 1,
        description:
          "Leaves the attacker exposed after committing to the strike.",
      },
    ],
    conditions: [],
    activation: {
      action: "major_action",
      ritual: false,
      concentration: false,
      channel: false,
      castTime: 0,
      duration: 1,
    },
    recharge: "long_rest",
    offensiveStat: OFFENSIVE_STATS.MIGHT,
    requirements: {
      properties: ["heavy", "two-handed"],
      minLevel: 10,
    },
  },

  // ============================================================
  // TRAITS
  // ============================================================

  // 16. TRAIT — defensive specialization
  {
    name: "Iron Will",
    kind: "trait",
    description:
      "Years of hardship have hardened the warrior's resolve against fear, pressure, and magical influence.",
    grantedPowers: [],
    targeting: {},
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.RESOLVE,
        value: 3,
        durationType: "permanent",
        duration: 0,
        description: "Permanently increases resolve.",
      },
    ],
    conditions: [],
    activation: {},
    recharge: "unlimited",
    requirements: {
      minLevel: 3,
    },
  },

  // 17. TRAIT — offensive progression
  {
    name: "Brutal Technique",
    kind: "trait",
    description:
      "The warrior learns to turn openings into devastating attacks, increasing the effectiveness of advanced combat techniques.",
    grantedPowers: [],
    targeting: {},
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.MIGHT,
        value: 2,
        durationType: "permanent",
        duration: 0,
        description: "Permanently increases might.",
      },
    ],
    conditions: [],
    activation: {},
    recharge: "unlimited",
    requirements: {
      minLevel: 5,
      requiredTraits: [],
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
