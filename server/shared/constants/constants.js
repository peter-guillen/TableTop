// Domains - DELETE when domain is setup

export const PROFESSIONS = [
  "warrior",
  "knight",
  "rogue",
  "ranger",
  "paladin",
  "warlock",
  "witch",
  "wizard",
  "sorcerer",
  "magician",
  "summoner",
  "psychic",
];

export const CONDITIONS = [
  "blinded",
  "charmed",
  "deafened",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "stunned",
  "unconscious",
];

// ------------------------- Global Constants -------------------------
// ------------------------- Global Constants -------------------------
// ------------------------- Global Constants -------------------------

export const EFFECT_TYPES = {
  DAMAGE: "damage",
  HEALING: "healing",
  BUFF: "buff",
  DEBUFF: "debuff",
  CONTROL: "control",
  UTILITY: "utility",
  SUMMON: "summon",
};

export const DAMAGE_TYPES = {
  SLASHING: "slashing",
  PIERCING: "piercing",
  BLUDGEONING: "bludgeoning",
  FIRE: "fire",
  WATER: "water",
  AIR: "air",
  EARTH: "earth",
  LIGHT: "light",
  DARK: "dark",
  FORCE: "force",
  PSYCHIC: "psychic",
  POISON: "poison",
  ACID: "acid",
  RADIANT: "radiant",
  NECROTIC: "necrotic",
};

export const STATS = {
  MIGHT: "might",
  ACCURACY: "accuracy",
  DOMINANCE: "dominance",
  EVASION: "evasion",
  RESOLVE: "resolve",
  RESILIENCE: "resilience",
  MOVEMENT: "movement",
  INITIATIVE: "initiative",
  HP: "hp",
  HP_MAX: "hpMax",
  MP: "mp",
  MP_MAX: "mpMax",
  MOM: "mom",
  MOM_MAX: "momMax",
};

export const OFFENSIVE_STATS = [STATS.MIGHT, STATS.ACCURACY, STATS.DOMINANCE];
export const DEFENSIVE_STATS = [STATS.RESILIENCE, STATS.EVASION, STATS.RESOLVE];
export const MOBILITY_STATS = [STATS.MOVEMENT, STATS.INITIATIVE];
export const RESOURCE_STATS = [STATS.HP, STATS.MP, STATS.MOM];

export const STAT_CATEGORIES = {
  OFFENSIVE: { label: "Offense", stats: OFFENSIVE_STATS },
  DEFENSIVE: { label: "Defense", stats: DEFENSIVE_STATS },
  MOBILITY: { label: "Mobility", stats: MOBILITY_STATS },
  RESOURCES: { label: "Resources", stats: RESOURCE_STATS },
};

export const SKILLS = {
  ACROBATICS: "acrobatics",
  ARCANA: "arcana",
  ATHLETICS: "athletics",
  CRAFTING: "crafting",
  DECEPTION: "deception",
  ENDURANCE: "endurance",
  HISTORY: "history",
  INSIGHT: "insight",
  INTIMIDATION: "intimidation",
  INVESTIGATION: "investigation",
  MEDICINE: "medicine",
  NATURE: "nature",
  PERCEPTION: "perception",
  PERFORMANCE: "performance",
  PERSUASION: "persuasion",
  RELIGION: "religion",
  LARCENY: "larceny",
  STEALTH: "stealth",
  SURVIVAL: "survival",
  TACTICS: "tactics",
  TAMING: "taming",
  WARFARE: "warfare",
};

// ------------------------- Item Constants -------------------------
// ------------------------- Item Constants -------------------------
// ------------------------- Item Constants -------------------------

export const MATERIALS = {
  SILVERED: "silvered",
  ADAMANDTINE: "adamantine",
  STEEL: "steel",
  IRON: "iron",
  MITHRIL: "mithril",
  ORICHALCUM: "orichalcum",
  DRAGONSCALE: "dragonscale",
  BONE: "bone",
  SILVER: "silver",
};

export const QUALITY = {
  ENCHANTED: "enchanted",
  BLESSED: "blessed",
  CURSED: "cursed",
  DIVINE: "divine",
  MASTERWORK: "masterwork",
  RUNED: "runed",
  CORRUPTED: "corrupted",
  SENTIENT: "sentient",
  UNSTABLE: "unstable",
  ANCESTRAL: "ancestral",
  FORBIDDEN: "forbidden",
  RELIC: "relic",
};

export const RARITY = {
  COMMON: "common",
  UNCOMMON: "uncommon",
  RARE: "rare",
  HEROIC: "heroic",
  EPIC: "epic",
  LEGENDARY: "legendary",
  MYTHIC: "mythic",
};

export const PROPERTIES = {
  // Change to Weapon_Properties since not all items use this
  FINESSE: "finesse",
  HEAVY: "heavy",
  LIGHT: "light",
  REACH: "reach",
  THROWN: "thrown",
  ONE_HANDED: "one-handed",
  TWO_HANDED: "two-handed",
  VERSATILE: "versatile",
};

export const ARMOR = [
  "light_armor",
  "medium_armor",
  "heavy_armor",
  "unarmored",
];

export const MAX_LEVEL = 10;

// Each character group starts with this many power slots; levelRewards[].slotIncreases add to it
export const BASE_POWER_SLOTS = 3;

export const POWER_GROUPS = ["spells", "abilities", "traits"];

// Classless characters have no profession, so they follow this track instead.
// Same shape as Profession.levelRewards.
export const CLASSLESS_LEVEL_REWARDS = [
  { level: 1, grants: [{ type: "playerChoice" }], statIncreases: [], slotIncreases: [] },
  {
    level: 2,
    grants: [{ type: "playerChoice" }],
    statIncreases: [
      { stat: STATS.HP_MAX, value: 3 },
      { stat: STATS.MP_MAX, value: 3 },
    ],
    slotIncreases: [],
  },
  {
    level: 3,
    grants: [{ type: "playerChoice" }],
    statIncreases: [],
    slotIncreases: [{ group: "abilities", value: 1 }],
  },
  {
    level: 4,
    grants: [{ type: "playerChoice" }],
    statIncreases: [{ stat: STATS.EVASION, value: 1 }],
    slotIncreases: [],
  },
  {
    level: 5,
    grants: [{ type: "playerChoice" }],
    statIncreases: [
      { stat: STATS.HP_MAX, value: 3 },
      { stat: STATS.MP_MAX, value: 3 },
    ],
    slotIncreases: [],
  },
  {
    level: 6,
    grants: [{ type: "playerChoice" }],
    statIncreases: [],
    slotIncreases: [{ group: "spells", value: 1 }],
  },
  {
    level: 7,
    grants: [{ type: "playerChoice" }],
    statIncreases: [{ stat: STATS.INITIATIVE, value: 1 }],
    slotIncreases: [],
  },
  {
    level: 8,
    grants: [{ type: "playerChoice" }],
    statIncreases: [
      { stat: STATS.HP_MAX, value: 3 },
      { stat: STATS.MP_MAX, value: 3 },
    ],
    slotIncreases: [],
  },
  {
    level: 9,
    grants: [{ type: "playerChoice" }],
    statIncreases: [],
    slotIncreases: [{ group: "traits", value: 1 }],
  },
  {
    level: 10,
    grants: [{ type: "playerChoice" }],
    statIncreases: [{ stat: STATS.MOM_MAX, value: 1 }],
    slotIncreases: [],
  },
];
