import dotenv from "dotenv";
import mongoose from "mongoose";
import Profession from "../domains/professions/profession.model.js";
import {
  STATS,
  OFFENSIVE_STATS,
  DAMAGE_TYPES,
  SKILLS,
  PROPERTIES,
  ARMOR,
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
    levelRewards: [
      {
        level: 1,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bb5" }, // Charge
        ],
      },
      {
        level: 2,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bb9", // Mach Strike
              "6ab98fc1154986dd2e962bc8", // Overhead Breaker
              "6ab98fc1154986dd2e962bcb", // Reaping Step
            ],
          },
        ],
      },
      {
        level: 3,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 4,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bbb" }, // Aegis
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bcd", // Armor Rend
              "6ab98fc1154986dd2e962bd0", // Executioner
            ],
          },
        ],
      },
      {
        level: 5,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd3" }, // Iron Will
        ],
      },
      {
        level: 6,
        grants: [
          { type: "playerChoice" },
          { type: "playerChoice" }, // exercises >1 grant of the SAME type at once
        ],
      },
      {
        level: 7,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962baf", // Fireball (off-theme on purpose — structure only)
              "6ab98fc1154986dd2e962bbd", // Frostbind
            ],
          },
        ],
      },
      {
        level: 8,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd5" }, // Brutal Technique
        ],
      },
      {
        level: 9,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 10,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bc6" }, // Deflect
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bc2", // Mending Light (off-theme on purpose)
              "6ab98fc1154986dd2e962bc4", // Void Collapse
              "6ab98fc1154986dd2e962bc0", // Thunder Lance
            ],
          },
          { type: "playerChoice" }, // three grants, three different types, same level
        ],
      },
    ],
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
    levelRewards: [
      {
        level: 1,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bb5" }, // Charge
        ],
      },
      {
        level: 2,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bb9", // Mach Strike
              "6ab98fc1154986dd2e962bc8", // Overhead Breaker
              "6ab98fc1154986dd2e962bcb", // Reaping Step
            ],
          },
        ],
      },
      {
        level: 3,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 4,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bbb" }, // Aegis
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bcd", // Armor Rend
              "6ab98fc1154986dd2e962bd0", // Executioner
            ],
          },
        ],
      },
      {
        level: 5,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd3" }, // Iron Will
        ],
      },
      {
        level: 6,
        grants: [
          { type: "playerChoice" },
          { type: "playerChoice" }, // exercises >1 grant of the SAME type at once
        ],
      },
      {
        level: 7,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962baf", // Fireball (off-theme on purpose — structure only)
              "6ab98fc1154986dd2e962bbd", // Frostbind
            ],
          },
        ],
      },
      {
        level: 8,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd5" }, // Brutal Technique
        ],
      },
      {
        level: 9,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 10,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bc6" }, // Deflect
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bc2", // Mending Light (off-theme on purpose)
              "6ab98fc1154986dd2e962bc4", // Void Collapse
              "6ab98fc1154986dd2e962bc0", // Thunder Lance
            ],
          },
          { type: "playerChoice" }, // three grants, three different types, same level
        ],
      },
    ],
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
    levelRewards: [
      {
        level: 1,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bb5" }, // Charge
        ],
      },
      {
        level: 2,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bb9", // Mach Strike
              "6ab98fc1154986dd2e962bc8", // Overhead Breaker
              "6ab98fc1154986dd2e962bcb", // Reaping Step
            ],
          },
        ],
      },
      {
        level: 3,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 4,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bbb" }, // Aegis
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bcd", // Armor Rend
              "6ab98fc1154986dd2e962bd0", // Executioner
            ],
          },
        ],
      },
      {
        level: 5,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd3" }, // Iron Will
        ],
      },
      {
        level: 6,
        grants: [
          { type: "playerChoice" },
          { type: "playerChoice" }, // exercises >1 grant of the SAME type at once
        ],
      },
      {
        level: 7,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962baf", // Fireball (off-theme on purpose — structure only)
              "6ab98fc1154986dd2e962bbd", // Frostbind
            ],
          },
        ],
      },
      {
        level: 8,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd5" }, // Brutal Technique
        ],
      },
      {
        level: 9,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 10,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bc6" }, // Deflect
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bc2", // Mending Light (off-theme on purpose)
              "6ab98fc1154986dd2e962bc4", // Void Collapse
              "6ab98fc1154986dd2e962bc0", // Thunder Lance
            ],
          },
          { type: "playerChoice" }, // three grants, three different types, same level
        ],
      },
    ],
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
    levelRewards: [
      {
        level: 1,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bb5" }, // Charge
        ],
      },
      {
        level: 2,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bb9", // Mach Strike
              "6ab98fc1154986dd2e962bc8", // Overhead Breaker
              "6ab98fc1154986dd2e962bcb", // Reaping Step
            ],
          },
        ],
      },
      {
        level: 3,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 4,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bbb" }, // Aegis
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bcd", // Armor Rend
              "6ab98fc1154986dd2e962bd0", // Executioner
            ],
          },
        ],
      },
      {
        level: 5,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd3" }, // Iron Will
        ],
      },
      {
        level: 6,
        grants: [
          { type: "playerChoice" },
          { type: "playerChoice" }, // exercises >1 grant of the SAME type at once
        ],
      },
      {
        level: 7,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962baf", // Fireball (off-theme on purpose — structure only)
              "6ab98fc1154986dd2e962bbd", // Frostbind
            ],
          },
        ],
      },
      {
        level: 8,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd5" }, // Brutal Technique
        ],
      },
      {
        level: 9,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 10,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bc6" }, // Deflect
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bc2", // Mending Light (off-theme on purpose)
              "6ab98fc1154986dd2e962bc4", // Void Collapse
              "6ab98fc1154986dd2e962bc0", // Thunder Lance
            ],
          },
          { type: "playerChoice" }, // three grants, three different types, same level
        ],
      },
    ],
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
    levelRewards: [
      {
        level: 1,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bb5" }, // Charge
        ],
      },
      {
        level: 2,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bb9", // Mach Strike
              "6ab98fc1154986dd2e962bc8", // Overhead Breaker
              "6ab98fc1154986dd2e962bcb", // Reaping Step
            ],
          },
        ],
      },
      {
        level: 3,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 4,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bbb" }, // Aegis
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bcd", // Armor Rend
              "6ab98fc1154986dd2e962bd0", // Executioner
            ],
          },
        ],
      },
      {
        level: 5,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd3" }, // Iron Will
        ],
      },
      {
        level: 6,
        grants: [
          { type: "playerChoice" },
          { type: "playerChoice" }, // exercises >1 grant of the SAME type at once
        ],
      },
      {
        level: 7,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962baf", // Fireball (off-theme on purpose — structure only)
              "6ab98fc1154986dd2e962bbd", // Frostbind
            ],
          },
        ],
      },
      {
        level: 8,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd5" }, // Brutal Technique
        ],
      },
      {
        level: 9,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 10,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bc6" }, // Deflect
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bc2", // Mending Light (off-theme on purpose)
              "6ab98fc1154986dd2e962bc4", // Void Collapse
              "6ab98fc1154986dd2e962bc0", // Thunder Lance
            ],
          },
          { type: "playerChoice" }, // three grants, three different types, same level
        ],
      },
    ],
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
    levelRewards: [
      {
        level: 1,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bb5" }, // Charge
        ],
      },
      {
        level: 2,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bb9", // Mach Strike
              "6ab98fc1154986dd2e962bc8", // Overhead Breaker
              "6ab98fc1154986dd2e962bcb", // Reaping Step
            ],
          },
        ],
      },
      {
        level: 3,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 4,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bbb" }, // Aegis
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bcd", // Armor Rend
              "6ab98fc1154986dd2e962bd0", // Executioner
            ],
          },
        ],
      },
      {
        level: 5,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd3" }, // Iron Will
        ],
      },
      {
        level: 6,
        grants: [
          { type: "playerChoice" },
          { type: "playerChoice" }, // exercises >1 grant of the SAME type at once
        ],
      },
      {
        level: 7,
        grants: [
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962baf", // Fireball (off-theme on purpose — structure only)
              "6ab98fc1154986dd2e962bbd", // Frostbind
            ],
          },
        ],
      },
      {
        level: 8,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bd5" }, // Brutal Technique
        ],
      },
      {
        level: 9,
        grants: [{ type: "playerChoice" }],
      },
      {
        level: 10,
        grants: [
          { type: "auto", trait: "6ab98fc1154986dd2e962bc6" }, // Deflect
          {
            type: "professionChoice",
            options: [
              "6ab98fc1154986dd2e962bc2", // Mending Light (off-theme on purpose)
              "6ab98fc1154986dd2e962bc4", // Void Collapse
              "6ab98fc1154986dd2e962bc0", // Thunder Lance
            ],
          },
          { type: "playerChoice" }, // three grants, three different types, same level
        ],
      },
    ],
  },
];

export const seedProfessions = async () => {
  await Profession.syncIndexes(); // drops stale indexes (e.g. old title_1), creates current ones
  await Profession.deleteMany({});
  const created = await Profession.insertMany(professionSeeds);
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
