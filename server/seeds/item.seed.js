import dotenv from "dotenv";
import mongoose from "mongoose";
import Item from "../domains/items/item.model.js";
import Power from "../domains/powers/power.model.js";
import {
  STATS,
  PROPERTIES,
  DAMAGE_TYPES,
  RARITY,
  QUALITY,
  MATERIALS,
} from "../shared/constants/constants.js";
import { fileURLToPath } from "url";

dotenv.config();

// grantedPowers[].power holds the Power's name here; seedItems swaps it for
// the real _id, so run power.seed.js first.
const itemSeeds = [
  // 1. WEAPON — base damage lives on the weapon; techniques without a
  //    damageType resolve against it.
  {
    name: "Flametongue",
    description:
      "A longsword forged with a sliver of elemental fire bound into the blade; it burns to the touch of anyone but its wielder.",
    category: "weapon",
    handedness: "versatile",
    rarity: RARITY.RARE,
    quality: [QUALITY.ENCHANTED],
    materials: [MATERIALS.STEEL],
    properties: [PROPERTIES.HEAVY, PROPERTIES.VERSATILE],
    value: 450,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.SLASHING,
        diceCount: 1,
        diceSize: 10,
        persistent: false,
      },
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.FIRE,
        diceCount: 1,
        diceSize: 4,
        persistent: false,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 2. WEAPON — a lighter, finesse-tagged weapon with no quality/enchantment,
  //    exercising the "plain steel" baseline case and multiple properties.
  {
    name: "Rapier",
    description:
      "A slender, quick blade favored by duelists for its speed over raw power.",
    category: "weapon",
    handedness: "one_handed",
    rarity: RARITY.COMMON,
    quality: [],
    materials: [MATERIALS.STEEL],
    properties: [PROPERTIES.FINESSE, PROPERTIES.LIGHT],
    value: 25,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.PIERCING,
        diceCount: 1,
        diceSize: 8,
        persistent: false,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 2b. WEAPON — reach polearm, the only weapon that unlocks reach techniques.
  {
    name: "Glaive",
    description:
      "A long-hafted polearm topped with a broad blade, built to keep foes at a distance.",
    category: "weapon",
    handedness: "two_handed",
    rarity: RARITY.COMMON,
    quality: [],
    materials: [MATERIALS.STEEL],
    properties: [PROPERTIES.HEAVY, PROPERTIES.REACH, PROPERTIES.TWO_HANDED],
    value: 20,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.SLASHING,
        diceCount: 1,
        diceSize: 10,
        persistent: false,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 3. ARMOR — exercises resistances (a rule most items won't use) and a
  //    permanent statModifier representing passive armor bonuses.
  {
    name: "Dragonscale Cuirass",
    description:
      "Plate armor fashioned from the scales of a slain drake, still faintly warm to the touch.",
    category: "armor",
    rarity: RARITY.EPIC,
    quality: [QUALITY.MASTERWORK],
    materials: [MATERIALS.DRAGONSCALE],
    properties: [PROPERTIES.HEAVY],
    value: 1200,
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.RESOLVE,
        value: 3,
        durationType: "permanent",
        description: "The scale plating steadies the wearer's nerve.",
      },
    ],
    resistances: [
      {
        damageType: DAMAGE_TYPES.FIRE,
        rule: "resistance",
      },
    ],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 4. ARMOR — a cursed piece: negative statModifier alongside a vulnerability,
  //    showing quality and resistances.rule can cut against the wearer.
  {
    name: "Shackled Plate",
    description:
      "Ancient armor bound by a curse that punishes its wearer with every step, though it hardens them against fire all the same.",
    category: "armor",
    rarity: RARITY.RARE,
    quality: [QUALITY.CURSED],
    materials: [MATERIALS.IRON],
    properties: [PROPERTIES.HEAVY],
    value: 80, // undervalued on the market due to the curse
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.MIGHT,
        value: -2,
        durationType: "permanent",
        description: "The curse saps the wearer's strength while worn.",
      },
    ],
    resistances: [
      {
        damageType: DAMAGE_TYPES.FIRE,
        rule: "resistance",
      },
      {
        damageType: DAMAGE_TYPES.FORCE,
        rule: "vulnerability",
      },
    ],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 5. ACCESSORY — exercises grantedPowers with a recharge + usesPerRecharge,
  //    referencing the real Guard Power from powerSeed.js.
  {
    name: "Warding Signet",
    description:
      "A plain iron ring engraved with old ward-glyphs; concentrating through it briefly hardens the wearer's resolve.",
    category: "accessory",
    rarity: RARITY.UNCOMMON,
    quality: [QUALITY.ENCHANTED],
    materials: [MATERIALS.IRON],
    properties: [],
    value: 150,
    healthEffects: [],
    statModifiers: [],
    resistances: [],
    grantedPowers: [
      {
        power: "Guard",
        recharge: "short_rest",
        usesPerRecharge: 1,
      },
    ],
    uniqueSkills: [],
  },

  // 6. ACCESSORY — a passive-only accessory, no grantedPowers, temporary
  //    (turns-based) statModifier instead of permanent, showing that path too.
  {
    name: "Amulet of Fleeting Fortune",
    description:
      "A trinket said to bend luck toward its wearer for a short, unpredictable window.",
    category: "accessory",
    rarity: RARITY.UNCOMMON,
    quality: [],
    materials: [MATERIALS.SILVER],
    properties: [],
    value: 90,
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.ACCURACY,
        value: 2,
        durationType: "turns",
        duration: 3,
        description: "A surge of luck sharpens the wearer's aim.",
      },
    ],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 7. TRINKET — rechargeable, exercises selfCharges (distinct from
  //    grantedPowers.recharge — this is the item's own charge pool) and
  //    grantedPowers referencing Weaken.
  {
    name: "Hexcaller's Bauble",
    description:
      "A small carved totem that channels a weakening curse when its stored charge is spent.",
    category: "trinket",
    rarity: RARITY.RARE,
    quality: [QUALITY.ENCHANTED],
    materials: [MATERIALS.BONE],
    properties: [],
    value: 300,
    healthEffects: [],
    statModifiers: [],
    resistances: [],
    grantedPowers: [
      {
        power: "Weaken",
        recharge: "long_rest",
        usesPerRecharge: 1,
      },
    ],
    selfCharges: {
      usesRemaining: 1,
      recharge: "long_rest",
    },
    uniqueSkills: [],
  },

  // 8. CONSUMABLE — exercises healthEffects (healing, single-use, non-persistent)
  //    with no rarity-driving quality/materials clutter — a baseline potion.
  {
    name: "Potion of Vigor",
    description:
      "A thick red draught that knits wounds shut almost as soon as it's swallowed.",
    category: "consumable",
    rarity: RARITY.COMMON,
    quality: [],
    materials: [],
    properties: [],
    value: 15,
    healthEffects: [
      {
        direction: "healing",
        diceCount: 2,
        diceSize: 8,
        flat: 2,
        persistent: false,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 9. CONSUMABLE — a damage-dealing throwable, exercising a fixed damageType
  //    healthEffect on a consumable rather than a weapon/technique.
  {
    name: "Vial of Caustic Acid",
    description:
      "A glass vial of viscous acid that bursts on impact, eating through flesh and armor alike.",
    category: "consumable",
    rarity: RARITY.COMMON,
    quality: [],
    materials: [],
    properties: [PROPERTIES.THROWN],
    value: 20,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.ACID,
        diceCount: 2,
        diceSize: 6,
        persistent: true,
        durationType: "turns",
        duration: 2,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },
  // 10. WEAPON — sentient + legendary, with a passive statModifier from the
  //     weapon's own will asserting itself on the wielder.
  {
    name: "Vaeloryn, the Watching Blade",
    description:
      "A curved orichalcum saber that hums with quiet awareness, occasionally turning half a degree in its wielder's grip as if choosing the angle of a cut itself.",
    category: "weapon",
    handedness: "one_handed",
    rarity: RARITY.LEGENDARY,
    quality: [QUALITY.SENTIENT, QUALITY.RUNED],
    materials: [MATERIALS.ORICHALCUM],
    properties: [PROPERTIES.FINESSE, PROPERTIES.ONE_HANDED],
    value: 8500,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.SLASHING,
        diceCount: 1,
        diceSize: 8,
        persistent: false,
      },
    ],
    statModifiers: [
      {
        stat: STATS.ACCURACY,
        value: 2,
        durationType: "permanent",
        description: "The blade's own instincts sharpen its wielder's aim.",
      },
    ],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 11. WEAPON — unstable, higher risk/reward flavor: a strong buff offset by
  //    a self-inflicted vulnerability, since "unstable" implies real cost.
  {
    name: "Fracturefang",
    description:
      "A jagged mithril hatchet wreathed in unstable eldritch static — every swing risks tearing a little of the wielder's own vitality loose along with the target's.",
    category: "weapon",
    handedness: "one_handed",
    rarity: RARITY.EPIC,
    quality: [QUALITY.UNSTABLE, QUALITY.ENCHANTED],
    materials: [MATERIALS.MITHRIL],
    properties: [PROPERTIES.LIGHT, PROPERTIES.THROWN],
    value: 2100,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.SLASHING,
        diceCount: 1,
        diceSize: 6,
        persistent: false,
      },
    ],
    statModifiers: [
      {
        stat: STATS.MIGHT,
        value: 4,
        durationType: "permanent",
        description: "Unstable eldritch charge lends raw destructive force.",
      },
      {
        stat: STATS.RESILIENCE,
        value: -2,
        durationType: "permanent",
        description:
          "The same instability leaves the wielder's own body frayed.",
      },
    ],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 12. ARMOR — ancestral + heroic: bound to a bloodline rather than generically
  //    magic, exercising a radiant resistance and a divine-flavored buff.
  {
    name: "Aegis of the Sunborn Line",
    description:
      "Heavy plate handed down through generations of a single paladin bloodline, said to recognize its rightful heir on contact.",
    category: "armor",
    rarity: RARITY.HEROIC,
    quality: [QUALITY.ANCESTRAL, QUALITY.BLESSED],
    materials: [MATERIALS.SILVERED],
    properties: [PROPERTIES.HEAVY],
    value: 3200,
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.RESOLVE,
        value: 3,
        durationType: "permanent",
        description: "The bloodline's old oath steadies the wearer's resolve.",
      },
    ],
    resistances: [
      { damageType: DAMAGE_TYPES.RADIANT, rule: "resistance" },
      { damageType: DAMAGE_TYPES.NECROTIC, rule: "vulnerability" },
    ],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 13. ARMOR — corrupted, escalated past cursed: a real drawback and an
  //    absorption rule (new resistances.rule value not yet exercised).
  {
    name: "Husk of the Devoured King",
    description:
      "Blackened armor plating that seems to drink in wounds meant for its wearer, at the cost of slowly hollowing them out from within.",
    category: "armor",
    rarity: RARITY.EPIC,
    quality: [QUALITY.CORRUPTED],
    materials: [MATERIALS.IRON],
    properties: [PROPERTIES.HEAVY],
    value: 600, // deeply undervalued given the corruption
    healthEffects: [],
    statModifiers: [
      {
        stat: STATS.MOM_MAX,
        value: -1,
        durationType: "permanent",
        description: "The corruption dulls the wearer's will to act.",
      },
    ],
    resistances: [{ damageType: DAMAGE_TYPES.NECROTIC, rule: "absorption" }],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 14. ACCESSORY — relic: historically significant without being especially
  //    powerful. Deliberately modest stat/value to show relic != strong.
  {
    name: "Signet of the Last Concord",
    description:
      "A tarnished bronze ring stamped with the seal of a treaty that ended a war three centuries ago. Scholars want it more than mages do.",
    category: "accessory",
    rarity: RARITY.RARE,
    quality: [QUALITY.RELIC],
    materials: [],
    properties: [],
    value: 400, // valued for history, not power
    healthEffects: [],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 15. ACCESSORY — forbidden, independent of raw power: strong effect but
  //    flagged narratively/mechanically as taboo to own. Grants Weaken.
  {
    name: "Warlock's Bound Tongue",
    description:
      "An amulet carved from a censured warlock's own binding-stone, outlawed in most kingdoms for the debts it lets its wearer collect from others.",
    category: "accessory",
    rarity: RARITY.EPIC,
    quality: [QUALITY.FORBIDDEN, QUALITY.CURSED],
    materials: [],
    properties: [],
    value: 50, // suppressed market value — few will buy it openly
    healthEffects: [],
    statModifiers: [],
    resistances: [],
    grantedPowers: [
      {
        power: "Weaken",
        recharge: "long_rest",
        usesPerRecharge: 1,
      },
    ],
    uniqueSkills: [],
  },

  // 16. TRINKET — divine + mythic ceiling case, rechargeable via selfCharges
  //    AND grants a Power, showing both recharge economies coexisting.
  {
    name: "Ember of the First Dawn",
    description:
      "A sliver of solidified sunlight said to be a fragment of the world's first sunrise, kept burning inside a cracked glass censer.",
    category: "trinket",
    rarity: RARITY.MYTHIC,
    quality: [QUALITY.DIVINE],
    materials: [],
    properties: [],
    value: 25000,
    healthEffects: [],
    statModifiers: [],
    resistances: [],
    grantedPowers: [
      {
        power: "Guard",
        recharge: "daily",
        usesPerRecharge: 1,
      },
    ],
    selfCharges: {
      usesRemaining: 1,
      recharge: "daily",
    },
    uniqueSkills: [],
  },

  // 17. TRINKET — runed, more grounded/common power tier than #7, showing the
  //    same shape (selfCharges + grantedPowers) doesn't require top rarity.
  {
    name: "Warden's Chime",
    description:
      "A small runed bell that rings a warning tone only its carrier can hear when danger draws close.",
    category: "trinket",
    rarity: RARITY.RARE,
    quality: [QUALITY.RUNED],
    materials: [MATERIALS.STEEL],
    properties: [],
    value: 350,
    healthEffects: [],
    statModifiers: [],
    resistances: [],
    grantedPowers: [
      {
        power: "Guard",
        recharge: "short_rest",
        usesPerRecharge: 2,
      },
    ],
    selfCharges: {
      usesRemaining: 2,
      recharge: "short_rest",
    },
    uniqueSkills: [],
  },

  // 18. CONSUMABLE — psychic-flavored, persistent debuff-style damage.
  {
    name: "Draught of Splintered Thought",
    description:
      "A shimmering violet tonic that, when thrown and shattered, floods a target's mind with fracturing psychic noise.",
    category: "consumable",
    rarity: RARITY.RARE,
    quality: [],
    materials: [],
    properties: [PROPERTIES.THROWN],
    value: 60,
    healthEffects: [
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.PSYCHIC,
        diceCount: 3,
        diceSize: 6,
        persistent: true,
        durationType: "turns",
        duration: 2,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },

  // 19. CONSUMABLE — necrotic + healing in the same item (a vampiric-style
  //     draught): exercises two healthEffects entries of opposite direction
  //     on a single consumable, distinct from Item #9's single-effect shape.
  {
    name: "Vial of Stolen Vigor",
    description:
      "A viscous black tonic distilled from necrotic residue — it burns the drinker faintly even as it knits their wounds shut.",
    category: "consumable",
    rarity: RARITY.HEROIC,
    quality: [QUALITY.CORRUPTED],
    materials: [],
    properties: [],
    value: 120,
    healthEffects: [
      {
        direction: "healing",
        diceCount: 4,
        diceSize: 8,
        persistent: false,
      },
      {
        direction: "damage",
        damageType: DAMAGE_TYPES.NECROTIC,
        flat: 3,
        persistent: false,
      },
    ],
    statModifiers: [],
    resistances: [],
    grantedPowers: [],
    uniqueSkills: [],
  },
];

export const seedItems = async () => {
  const powers = await Power.find({}, "name");
  const seeds = itemSeeds.map((item) => ({
    ...item,
    grantedPowers: item.grantedPowers.map((granted) => {
      const power = powers.find((p) => p.name === granted.power);
      if (!power) {
        throw new Error(
          `Power "${granted.power}" not found — run power.seed.js first`,
        );
      }
      return { ...granted, power: power._id };
    }),
  }));
  await Item.deleteMany({});
  const created = await Item.insertMany(seeds);
  console.log(`Seeded ${created.length} items.`);
  return created;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spells-app";
  console.log("Connecting to:", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(seedItems)
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
