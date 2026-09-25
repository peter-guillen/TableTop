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

export const AFFINITIES = [
  "arcane",
  "primal",
  "divine",
  "eldritch",
  "blood",
  "psionic",
  "martial",
  "chi",
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

export const BACKGROUNDS = [
  "soldier",
  "sage",
  "scholar",
  "thief",
  "acolyte",
  "mercenary",
  "adventurer",
];

export const TRAITS = [
  "steady",
  "fast_and_furious",
  "unshakeable",
  "super_strong",
  "patient",
];

export const SPECIES = [
  "human",
  "dwarf",
  "elf",
  "orc",
  "naga",
  "werewolf",
  "vampire",
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
