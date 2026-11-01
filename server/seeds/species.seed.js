import dotenv from "dotenv";
import mongoose from "mongoose";
import Species from "../domains/species/species.model.js";
import { STATS } from "../shared/constants/constants.js";
// TODO: export SPELLS (array of canonical species names) from constants.js
// to re-enable the drift guard in seedSpeciess() below.
// import { STATS, SPELLS } from "../modules/constants/constants.js";
import { fileURLToPath } from "url";

dotenv.config();

const speciesSeeds = [
  {
    name: "Human",
    description:
      "Adaptable and ambitious, humans favor versatility over specialization.",
    statModifiers: [],
    resistances: [],
    traits: [], // e.g. "Versatile" — extra talent point at creation
  },
  {
    name: "Elf",
    description:
      "Long-lived and precise, elves favor finesse over brute force.",
    statModifiers: [
      { stat: STATS.ACCURACY, value: 1, description: "Elven precision" },
      { stat: STATS.EVASION, value: 1, description: "Elven grace" },
    ],
    resistances: [],
    traits: [], // e.g. "Keen Senses"
  },
  {
    name: "Dwarf",
    description: "Sturdy and resolute, dwarves are built to endure.",
    statModifiers: [
      { stat: STATS.RESILIENCE, value: 2, description: "Dwarven toughness" },
    ],
    resistances: [{ damageType: "poison", rule: "resistance" }],
    traits: [], // e.g. "Stonecunning"
  },
  {
    name: "Orc",
    description: "Powerfully built, orcs hit hard and hit first.",
    statModifiers: [
      { stat: STATS.MIGHT, value: 2, description: "Orcish strength" },
    ],
    resistances: [],
    traits: [], // e.g. "Relentless"
  },
  {
    name: "Dragonkin",
    description:
      "Descended from draconic bloodlines, dragonkin carry an innate elemental affinity.",
    statModifiers: [
      { stat: STATS.DOMINANCE, value: 1, description: "Draconic presence" },
    ],
    resistances: [{ damageType: "fire", rule: "resistance" }],
    traits: [], // e.g. "Draconic Breath" — likely grants a Power ref once Traits exist
  },
];

export const seedSpecies = async () => {
  // Drift guard — uncomment once SPELLS is exported from constants.js
  // const seededNames = speciesSeeds.map((s) => s.name);
  // const missing = SPELLS.filter((name) => !seededNames.includes(name));
  // if (missing.length > 0) {
  //   console.warn(
  //     `Warning: SPELLS has entries with no seed data: ${missing.join(", ")}`,
  //   );
  // }

  await Species.deleteMany({});
  const created = await Species.insertMany(speciesSeeds);
  console.log(`Seeded ${created.length} species.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedSpecies)
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
