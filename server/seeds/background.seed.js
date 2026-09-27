import dotenv from "dotenv";
import mongoose from "mongoose";
import Backgrounds from "../domains/backgrounds/background.model.js";
import { SKILLS, STATS } from "../shared/constants/constants.js";
// TODO: export SPELLS (array of canonical background names) from constants.js
// to re-enable the drift guard in seedBackgroundss() below.
// import { STATS, SPELLS } from "../modules/constants/constants.js";
import { fileURLToPath } from "url";

dotenv.config();

const backgroundSeeds = [
  {
    name: "Soldier",
    description: "Trained in formal combat and military discipline.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 1, description: "Combat conditioning" },
    ],
    skillProficiencies: [SKILLS.ATHLETICS, SKILLS.INTIMIDATION],
    startingItems: [], // e.g. ref to a basic weapon/armor Item once seeded
    traits: [], // e.g. "Tactical Training"
  },
  {
    name: "Scholar",
    description: "Steeped in books, theory, and academic rigor.",
    statModifiers: [
      { stat: STATS.RESOLVE, value: 1, description: "Disciplined mind" },
    ],
    skillProficiencies: [SKILLS.ARCANA, SKILLS.INVESTIGATION],
    startingItems: [],
    traits: [], // e.g. "Well-Read"
  },
  {
    name: "Criminal",
    description: "Learned to survive on the wrong side of the law.",
    statModifiers: [
      { stat: STATS.EVASION, value: 1, description: "Street reflexes" },
    ],
    skillProficiencies: [SKILLS.STEALTH, SKILLS.DECEPTION],
    startingItems: [],
    traits: [], // e.g. "Contacts in the Underworld"
  },
  {
    name: "Noble",
    description: "Raised in privilege, wealth, and political maneuvering.",
    statModifiers: [
      { stat: STATS.DOMINANCE, value: 1, description: "Bred authority" },
    ],
    skillProficiencies: [SKILLS.PERSUASION, SKILLS.HISTORY],
    startingItems: [], // e.g. signet ring, fine clothes
    traits: [], // e.g. "Retainer" or "Noble Bearing"
  },
  {
    name: "Hermit",
    description: "Spent years in isolation, apart from society.",
    statModifiers: [
      { stat: STATS.RESILIENCE, value: 1, description: "Hardened by solitude" },
    ],
    skillProficiencies: [SKILLS.SURVIVAL, SKILLS.MEDICINE],
    startingItems: [],
    traits: [], // e.g. "Self-Sufficient"
  },
  {
    name: "Artisan",
    description: "Trained in a trade, craft, or guild discipline.",
    statModifiers: [
      {
        stat: STATS.ACCURACY,
        value: 1,
        description: "Steady, practiced hands",
      },
    ],
    skillProficiencies: [SKILLS.CRAFTING, SKILLS.INSIGHT],
    startingItems: [], // e.g. a trade tool Item ref
    traits: [], // e.g. "Guild Membership"
  },
];

export const seedBackgrounds = async () => {
  // Drift guard — uncomment once SPELLS is exported from constants.js
  // const seededNames = backgroundSeeds.map((s) => s.name);
  // const missing = SPELLS.filter((name) => !seededNames.includes(name));
  // if (missing.length > 0) {
  //   console.warn(
  //     `Warning: SPELLS has entries with no seed data: ${missing.join(", ")}`,
  //   );
  // }

  await Backgrounds.deleteMany({});
  const created = await Backgrounds.insertMany(backgroundSeeds);
  console.log(`Seeded ${created.length} backgrounds.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedBackgrounds)
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
