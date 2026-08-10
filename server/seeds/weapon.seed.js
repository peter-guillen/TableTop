import dotenv from "dotenv";
import mongoose from "mongoose";
import Weapon from "../domains/weapons/weapon.model.js"; // verify this path
import { fileURLToPath } from "url";

dotenv.config();

const weaponSeeds = [
  {
    name: "Iron Shortsword",
    description:
      "A simple, well-balanced blade favored by militia and travelers alike.",
    category: "melee",
    damageType: ["slashing"],
    properties: ["finesse", "one-handed"],
    materials: ["iron"],
    quality: [],
    rarity: "common",
    statModifiers: [],
    skills: [],
    uniqueSkills: [],
    value: 15,
  },
  {
    name: "Wooden Crossbow",
    description:
      "A basic ranged weapon, cheaply made but reliable enough for hunting or the front line.",
    category: "ranged",
    damageType: ["piercing"],
    properties: ["two-handed", "heavy"],
    materials: [],
    quality: [],
    rarity: "common",
    statModifiers: [],
    skills: [],
    uniqueSkills: [],
    value: 25,
  },
  {
    name: "Steel Warhammer",
    description:
      "A dense, two-handed hammer built to crush armor and bone alike.",
    category: "melee",
    damageType: ["bludgeoning"],
    properties: ["heavy", "two-handed"],
    materials: ["steel"],
    quality: ["Masterwork"],
    rarity: "rare",
    statModifiers: [
      {
        stat: "Might",
        value: 1,
        durationType: "permanent",
        target: "self",
        description: "The weapon's balance strengthens the wielder's swing.",
      },
    ],
    skills: [],
    uniqueSkills: [],
    value: 120,
  },
  {
    name: "Frostfire Dagger",
    description:
      "A short blade that flickers between burning heat and freezing cold with every strike.",
    category: "melee",
    damageType: ["fire", "water"],
    properties: ["finesse", "light", "thrown"],
    materials: ["steel"],
    quality: ["Enchanted"],
    rarity: "rare",
    statModifiers: [
      {
        stat: "Accuracy",
        value: 1,
        durationType: "permanent",
        target: "self",
        description:
          "The blade's elemental flux sharpens the wielder's precision.",
      },
    ],
    skills: ["6a699f5d1ca33abc69486f4c", "6a6d8504138d5ddf2713960f"],
    uniqueSkills: ["Elemental Flicker"],
    value: 300,
  },
  {
    name: "Silvered Rapier",
    description:
      "A slender, consecrated blade forged to pierce both flesh and the unnatural.",
    category: "melee",
    damageType: ["piercing", "radiant"],
    properties: ["finesse", "light"],
    materials: ["silvered"],
    quality: ["Blessed"],
    rarity: "heroic",
    statModifiers: [
      {
        stat: "Accuracy",
        value: 2,
        durationType: "permanent",
        target: "self",
        description:
          "A blessing steadies the wielder's aim against unholy foes.",
      },
    ],
    skills: ["6a699f5d1ca33abc69486f4d", "6a699f5d1ca33abc69486f50"],
    uniqueSkills: [],
    value: 450,
  },
  {
    name: "Mithril Longbow",
    description:
      "An impossibly light bow woven from mithril strands, said to sing when drawn.",
    category: "ranged",
    damageType: ["piercing", "force"],
    properties: ["two-handed"],
    materials: ["mithril"],
    quality: ["Runed"],
    rarity: "epic",
    statModifiers: [
      {
        stat: "Accuracy",
        value: 3,
        durationType: "permanent",
        target: "self",
        description: "Runes etched along the limbs guide every arrow true.",
      },
    ],
    skills: ["6a699f5d1ca33abc69486f4f"],
    uniqueSkills: ["Piercing Shot"],
    value: 1200,
  },
  {
    name: "Adamantine Greataxe",
    description:
      "A monstrous axe of black adamantine, said to hunger for the strength it grants.",
    category: "melee",
    damageType: ["slashing", "necrotic"],
    properties: ["heavy", "two-handed"],
    materials: ["adamantine"],
    quality: ["Cursed", "Corrupted"],
    rarity: "legendary",
    statModifiers: [
      {
        stat: "Might",
        value: 4,
        durationType: "permanent",
        target: "self",
        description: "The axe lends overwhelming strength to its wielder.",
      },
      {
        stat: "Resolve",
        value: -2,
        durationType: "permanent",
        target: "self",
        description:
          "The curse gnaws at the wielder's will the longer it's carried.",
      },
    ],
    skills: ["6a699f5d1ca33abc69486f4f"],
    uniqueSkills: [],
    value: 5000,
  },
  {
    name: "Orichalcum Spellblade",
    description:
      "A blade of living orichalcum that thinks, watches, and chooses its own battles.",
    category: "magic",
    damageType: ["force", "psychic", "radiant"],
    properties: ["finesse", "versatile"],
    materials: ["orichalcum"],
    quality: ["Divine", "Sentient"],
    rarity: "mythic",
    statModifiers: [
      {
        stat: "Dominance",
        value: 6,
        durationType: "permanent",
        target: "self",
        description:
          "The blade's will amplifies the wielder's presence in battle.",
      },
      {
        stat: "mom",
        value: 50,
        durationType: "permanent",
        target: "self",
        description:
          "A surge of momentum flows from the weapon's awakened power.",
      },
    ],
    skills: [
      "6a699f5d1ca33abc69486f4b",
      "6a699f5d1ca33abc69486f4e",
      "6a699f5d1ca33abc69486f50",
    ],
    uniqueSkills: ["Astral Cleave", "Mind's Edge"],
    value: 25000,
  },
];

export const seedWeapons = async () => {
  await Weapon.deleteMany({});
  const created = await Weapon.insertMany(weaponSeeds);
  console.log(`Seeded ${created.length} weapons.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedWeapons)
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
