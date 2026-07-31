import dotenv from "dotenv";
import mongoose from "mongoose";
import Condition from "../domains/conditions/condition.model.js";
import { CONDITIONS } from "../shared/constants/constants.js";
import { fileURLToPath } from "url";

dotenv.config();

const conditionSeeds = [
  {
    name: "blinded",
    description:
      "Cannot see and automatically fails any check requiring sight; attacks against the target have advantage, and its attacks have disadvantage.",
  },
  {
    name: "charmed",
    description:
      "Cannot attack the charmer or target them with harmful abilities; the charmer has advantage on social checks against the target.",
  },
  {
    name: "deafened",
    description:
      "Cannot hear and automatically fails any check requiring hearing.",
  },
  {
    name: "frightened",
    description:
      "Disadvantage on actions while the source of fear is in sight.",
  },
  {
    name: "grappled",
    description:
      "Speed becomes 0 and cannot benefit from bonuses to speed; ends if the grappler is incapacitated.",
  },
  {
    name: "incapacitated",
    description: "Cannot take actions or reactions.",
  },
  {
    name: "invisible",
    description: "Cannot be targeted by attacks that require sight.",
  },
  {
    name: "paralyzed",
    description:
      "Incapacitated and cannot move or speak; attacks against the target have advantage, and hits within close range are automatic critical hits.",
  },
  {
    name: "petrified",
    description:
      "Transformed into a solid substance; incapacitated, cannot move or speak, and is unaware of surroundings.",
  },
  {
    name: "poisoned",
    description: "Takes poison damage at the start of each affected turn.",
  },
  {
    name: "prone",
    description:
      "Attacks against a prone target have advantage; the target must spend an action to stand.",
  },
  {
    name: "restrained",
    description:
      "Movement reduced to 0; attacks against the target have advantage.",
  },
  {
    name: "stunned",
    description: "Cannot take actions or reactions while stunned.",
  },
  {
    name: "unconscious",
    description:
      "Incapacitated, cannot move or speak, and is unaware of surroundings; attacks against the target have advantage.",
  },
];

export const seedConditions = async () => {
  // Guard against constants drifting from the seed list
  // const seededNames = conditionSeeds.map((c) => c.condition);
  // const missing = CONDITIONS.filter((c) => !seededNames.includes(c));
  // if (missing.length > 0) {
  //   console.warn(
  //     `Warning: CONDITIONS has entries with no seed data: ${missing.join(", ")}`,
  //   );
  // }

  await Condition.deleteMany({});
  const created = await Condition.insertMany(conditionSeeds);
  console.log(`Seeded ${created.length} conditions.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedConditions)
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
