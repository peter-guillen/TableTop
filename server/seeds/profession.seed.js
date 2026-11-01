import dotenv from "dotenv";
import mongoose from "mongoose";
import Profession from "../domains/professions/profession.model.js";
import Power from "../domains/powers/power.model.js";
import { STATS, SKILLS, PROPERTIES } from "../shared/constants/constants.js";
import { fileURLToPath } from "url";

dotenv.config();

// Grants hold Power names here; seedProfessions swaps them for real _ids,
// so run power.seed.js first. Techniques never appear in levelRewards —
// they come from weapon properties.

// Fighters: durable, gain traits and HP, pick up a little defensive magic
const MARTIAL_REWARDS = [
  { level: 1, grants: [{ type: "auto", trait: "Guard" }] },
  { level: 2, grants: [], statIncreases: [{ stat: STATS.HP_MAX, value: 5 }] },
  { level: 3, grants: [{ type: "auto", trait: "Iron Will" }] },
  {
    level: 4,
    grants: [{ type: "professionChoice", options: ["Aegis", "Mending Light"] }],
    statIncreases: [{ stat: STATS.HP_MAX, value: 5 }],
  },
  {
    level: 5,
    grants: [{ type: "auto", trait: "Brutal Technique" }],
    slotIncreases: [{ group: "traits", value: 1 }],
  },
  {
    level: 6,
    grants: [{ type: "playerChoice" }],
    statIncreases: [{ stat: STATS.MIGHT, value: 1 }],
  },
  {
    level: 7,
    grants: [],
    statIncreases: [
      { stat: STATS.HP_MAX, value: 5 },
      { stat: STATS.MP_MAX, value: 5 },
    ],
    slotIncreases: [{ group: "abilities", value: 1 }],
  },
  {
    level: 8,
    grants: [{ type: "playerChoice" }],
    slotIncreases: [{ group: "spells", value: 1 }],
  },
  {
    level: 9,
    grants: [],
    statIncreases: [
      { stat: STATS.RESILIENCE, value: 1 },
      { stat: STATS.HP_MAX, value: 5 },
    ],
  },
  {
    level: 10,
    grants: [
      { type: "professionChoice", options: ["Thunder Lance", "Void Collapse"] },
      { type: "playerChoice" },
    ],
    statIncreases: [{ stat: STATS.MOM_MAX, value: 1 }],
  },
];

// Casters: spell-heavy, gain MP and spell slots
const CASTER_REWARDS = [
  { level: 1, grants: [{ type: "auto", trait: "Ignite" }] },
  { level: 2, grants: [], statIncreases: [{ stat: STATS.MP_MAX, value: 5 }] },
  {
    level: 3,
    grants: [{ type: "professionChoice", options: ["Fireball", "Frostbind"] }],
  },
  {
    level: 4,
    grants: [],
    statIncreases: [{ stat: STATS.MP_MAX, value: 5 }],
    slotIncreases: [{ group: "spells", value: 1 }],
  },
  { level: 5, grants: [{ type: "auto", trait: "Thunder Lance" }] },
  {
    level: 6,
    grants: [{ type: "playerChoice" }],
    statIncreases: [{ stat: STATS.DOMINANCE, value: 1 }],
  },
  {
    level: 7,
    grants: [],
    statIncreases: [
      { stat: STATS.MP_MAX, value: 5 },
      { stat: STATS.HP_MAX, value: 3 },
    ],
  },
  {
    level: 8,
    grants: [{ type: "professionChoice", options: ["Aegis", "Mending Light"] }],
    slotIncreases: [{ group: "spells", value: 1 }],
  },
  {
    level: 9,
    grants: [{ type: "playerChoice" }],
    statIncreases: [{ stat: STATS.RESOLVE, value: 1 }],
  },
  {
    level: 10,
    grants: [{ type: "auto", trait: "Void Collapse" }],
    statIncreases: [{ stat: STATS.MP_MAX, value: 10 }],
    slotIncreases: [{ group: "spells", value: 1 }],
  },
];

const professionSeeds = [
  {
    name: "Warrior",
    description: "A frontline fighter trained in relentless, direct combat.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Warrior conditioning" },
    ],
    armorProficiencies: ["light_armor", "medium_armor", "heavy_armor"],
    weaponProficiencies: [
      PROPERTIES.HEAVY,
      PROPERTIES.ONE_HANDED,
      PROPERTIES.TWO_HANDED,
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [],
    levelRewards: MARTIAL_REWARDS,
  },
  {
    name: "Knight",
    description: "A frontline fighter trained in relentless, direct combat.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Warrior conditioning" },
    ],
    armorProficiencies: ["light_armor", "medium_armor", "heavy_armor"],
    weaponProficiencies: [
      PROPERTIES.HEAVY,
      PROPERTIES.ONE_HANDED,
      PROPERTIES.TWO_HANDED,
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [],
    levelRewards: MARTIAL_REWARDS,
  },
  {
    name: "Wizard",
    description: "A frontline fighter trained in relentless, direct combat.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Warrior conditioning" },
    ],
    armorProficiencies: ["light_armor", "medium_armor", "heavy_armor"],
    weaponProficiencies: [
      PROPERTIES.HEAVY,
      PROPERTIES.ONE_HANDED,
      PROPERTIES.TWO_HANDED,
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [],
    levelRewards: CASTER_REWARDS,
  },
  {
    name: "Witch",
    description: "A frontline fighter trained in relentless, direct combat.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Warrior conditioning" },
    ],
    armorProficiencies: ["light_armor", "medium_armor", "heavy_armor"],
    weaponProficiencies: [
      PROPERTIES.HEAVY,
      PROPERTIES.ONE_HANDED,
      PROPERTIES.TWO_HANDED,
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [],
    levelRewards: CASTER_REWARDS,
  },
  {
    name: "Paladin",
    description: "A frontline fighter trained in relentless, direct combat.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Warrior conditioning" },
    ],
    armorProficiencies: ["light_armor", "medium_armor", "heavy_armor"],
    weaponProficiencies: [
      PROPERTIES.HEAVY,
      PROPERTIES.ONE_HANDED,
      PROPERTIES.TWO_HANDED,
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [],
    levelRewards: MARTIAL_REWARDS,
  },
  {
    name: "Rogue",
    description: "A frontline fighter trained in relentless, direct combat.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Warrior conditioning" },
    ],
    armorProficiencies: ["light_armor", "medium_armor", "heavy_armor"],
    weaponProficiencies: [
      PROPERTIES.HEAVY,
      PROPERTIES.ONE_HANDED,
      PROPERTIES.TWO_HANDED,
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [],
    levelRewards: MARTIAL_REWARDS,
  },
];

export const seedProfessions = async () => {
  const powers = await Power.find({}, "name");
  const missing = professionSeeds
    .flatMap((profession) => profession.levelRewards)
    .flatMap((reward) => reward.grants)
    .flatMap((grant) => [grant.trait, ...(grant.options ?? [])])
    .filter((name) => name && !powers.some((p) => p.name === name));
  if (missing.length > 0) {
    throw new Error(
      `Powers not found: ${[...new Set(missing)].join(", ")} — run power.seed.js first`,
    );
  }
  const seeds = professionSeeds.map((profession) => ({
    ...profession,
    levelRewards: profession.levelRewards.map((reward) => ({
      ...reward,
      grants: reward.grants.map((grant) => ({
        type: grant.type,
        trait: powers.find((p) => p.name === grant.trait)?._id,
        options: (grant.options ?? []).map(
          (name) => powers.find((p) => p.name === name)._id,
        ),
      })),
    })),
  }));
  await Profession.syncIndexes(); // drops stale indexes (e.g. old title_1), creates current ones
  await Profession.deleteMany({});
  const created = await Profession.insertMany(seeds);
  console.log(`Seeded ${created.length} professions.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedProfessions)
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
