export const SKILLS = {
  Martial: [
    "Athletics",
    "Intimidation",
    "Weapon Mastery",
    "Endurance",
    "Tactics",
    "Survival",
  ],
  Sorcerer: [
    "Arcana",
    "Perception",
    "Fate Reading",
    "Persuasion",
    "History",
    "Insight",
  ],
  Wizard: [
    "Arcana",
    "History",
    "Investigation",
    "Medicine",
    "Nature",
    "Religion",
  ],
  Witch: ["Arcana", "Nature", "Deception", "Stealth", "Insight", "Survival"],
  Classless: [
    "Athletics",
    "Arcana",
    "Perception",
    "Stealth",
    "Survival",
    "Insight",
    "Nature",
    "History",
  ],
};

const CLASSES = ["Martial", "Sorcerer", "Wizard", "Witch"];

const BASE_STATS = {
  Martial: {
    mov: 6,
    atk: 2,
    def: 12,
    dom: 6,
    eva: 1,
    sok: 2,
    momCap: 5,
    hp: 40,
    mp: 10,
  },
  Sorcerer: {
    mov: 5,
    atk: 1,
    def: 10,
    dom: 6,
    eva: 2,
    sok: 0,
    momCap: 5,
    hp: 28,
    mp: 30,
  },
  Wizard: {
    mov: 4,
    atk: 1,
    dom: 6,
    def: 9,
    eva: 1,
    sok: 0,
    momCap: 4,
    hp: 24,
    mp: 40,
  },
  Witch: {
    mov: 5,
    atk: 1,
    dom: 6,
    def: 10,
    eva: 1,
    sok: 1,
    momCap: 4,
    hp: 30,
    mp: 25,
  },
  Classless: {
    mov: 5,
    atk: 0,
    dom: 6,
    def: 10,
    eva: 0,
    sok: 0,
    momCap: 3,
    hp: 26,
    mp: 20,
  },
};

const RACE_MODS = {
  Human: { mov: 0, atk: 0, def: 0, eva: 0, sok: 0, hp: 4, mp: 0 },
  Elf: { mov: 1, atk: 0, def: 0, eva: 2, sok: 0, hp: 0, mp: 8 },
  Dwarf: { mov: -1, atk: 0, def: 2, eva: 0, sok: 2, hp: 8, mp: 0 },
  Halfling: { mov: 0, atk: 1, def: 0, eva: 1, sok: 0, hp: 2, mp: 4 },
  Tiefling: { mov: 0, atk: 1, def: 1, eva: 0, sok: 0, hp: 2, mp: 6 },
};

const BG_MODS = {
  Soldier: { atk: 1, skillBonus: "Athletics" },
  Scholar: { def: 1, skillBonus: "Arcana" },
  Wanderer: { mov: 1, skillBonus: "Survival" },
  Acolyte: { sok: 1, skillBonus: "Religion", mp: 6 },
  Criminal: { eva: 1, skillBonus: "Stealth" },
};

const FEATURES = {
  Martial: [
    {
      name: "Iron Stance",
      type: "Innate",
      cost: "1M",
      desc: "Reduce incoming damage by 2 until next turn.",
      mods: { sok: 2 },
    },
    {
      name: "Chain Strike",
      type: "Learned",
      cost: "2M",
      desc: "Strike twice; on both hits push target 1 zone.",
      mods: { atk: 1 },
    },
    {
      name: "War Cry",
      type: "Innate",
      cost: "1M",
      desc: "Allies in range gain +1 Momentum next action.",
      mods: {},
    },
    {
      name: "Momentum Surge",
      type: "Learned",
      cost: "0M",
      desc: "On kill, gain 2 Momentum immediately.",
      mods: {},
    },
    {
      name: "Shield Wall",
      type: "Innate",
      cost: "1M",
      desc: "Raise defense until your next turn.",
      mods: { def: 3 },
    },
    {
      name: "Reckless Strike",
      type: "Learned",
      cost: "1M",
      desc: "Deal +4 damage; take -2 Defense until next turn.",
      mods: { atk: 3 },
    },
  ],
  Sorcerer: [
    {
      name: "Fated Strike",
      type: "Innate",
      cost: "1M",
      desc: "Reroll any die. Adds Resonance charge.",
      mods: { atk: 1 },
    },
    {
      name: "Probability Warp",
      type: "Learned",
      cost: "2M",
      desc: "Force target reroll, take lower. +2 Resonance.",
      mods: {},
    },
    {
      name: "Unravel",
      type: "Innate",
      cost: "1M",
      desc: "Spend Resonance to drop a status 1 stack.",
      mods: {},
    },
    {
      name: "Cascade",
      type: "Learned",
      cost: "3M",
      desc: "Trigger Backlash early; convert Resonance to arc damage.",
      mods: { atk: 2 },
    },
    {
      name: "Veil Step",
      type: "Innate",
      cost: "2M",
      desc: "Briefly phase. +3 Evasion this round.",
      mods: { eva: 3 },
    },
  ],
  Wizard: [
    {
      name: "Sigil Bind",
      type: "Learned",
      cost: "2M",
      desc: "Place glyph that fires on next enemy zone entry.",
      mods: {},
    },
    {
      name: "Arcane Sight",
      type: "Innate",
      cost: "1M",
      desc: "Detect magic sources and traditions within 3 zones.",
      mods: {},
    },
    {
      name: "Force Lance",
      type: "Learned",
      cost: "2M",
      desc: "Ranged hit + push 1 zone. Pierces Evasion at +1.",
      mods: { atk: 2 },
    },
    {
      name: "Counterspell",
      type: "Innate",
      cost: "2M",
      desc: "Interrupt and negate a Power being activated.",
      mods: {},
    },
    {
      name: "Arcane Barrier",
      type: "Innate",
      cost: "1M",
      desc: "Conjure a ward. +4 Defense this round.",
      mods: { def: 4 },
    },
  ],
  Witch: [
    {
      name: "Hex",
      type: "Innate",
      cost: "1M",
      desc: "Apply Cursed 1. Stacks. +1 damage per stack on hits.",
      mods: {},
    },
    {
      name: "Blood Drain",
      type: "Learned",
      cost: "2M",
      desc: "Deal damage equal to Cursed stacks on target. Heal half.",
      mods: { atk: 1 },
    },
    {
      name: "Spirit Binding",
      type: "Innate",
      cost: "2M",
      desc: "Root target 1 round; they cannot spend Momentum.",
      mods: {},
    },
    {
      name: "Blight Touch",
      type: "Learned",
      cost: "1M",
      desc: "Apply Weakened 1. Target deals -1 per stack.",
      mods: {},
    },
    {
      name: "Shroud",
      type: "Innate",
      cost: "1M",
      desc: "Wrap self in shadow. +2 Evasion, +1 Movement.",
      mods: { eva: 2, mov: 1 },
    },
  ],
};

const CLASSLESS_FEATS = [
  {
    name: "Instinct",
    type: "Innate",
    cost: "0M",
    src: "Chi",
    desc: "React before hit resolves. +1 Evasion this hit.",
    mods: { eva: 1 },
  },
  {
    name: "Wild Draw",
    type: "Learned",
    cost: "2M",
    src: "Arcane",
    desc: "Pull random power from any tradition until encounter ends.",
    mods: {},
  },
  {
    name: "Mend",
    type: "Innate",
    cost: "1M",
    src: "Natural",
    desc: "Recover 2 HP at start of turn if not attacked last round.",
    mods: {},
  },
  {
    name: "Mind Spike",
    type: "Learned",
    cost: "2M",
    src: "Psionic",
    desc: "Deal psychic damage; target loses 1 Momentum.",
    mods: { atk: 1 },
  },
  {
    name: "Sanguine Mark",
    type: "Learned",
    cost: "1M",
    src: "Blood",
    desc: "Mark target; your next hit deals +3.",
    mods: { atk: 2 },
  },
  {
    name: "Smite",
    type: "Innate",
    cost: "2M",
    src: "Divine",
    desc: "Imbue next hit with radiant damage. Ignores soak.",
    mods: { atk: 2 },
  },
];

const WEAPONS = {
  Melee: [
    { name: "Longsword", dmg: "1d8+Atk", spd: "2M", range: "Melee" },
    { name: "Warhammer", dmg: "1d10+Atk", spd: "3M", range: "Melee" },
    { name: "Rapier", dmg: "1d6+Atk", spd: "1M", range: "Melee" },
    { name: "Dagger", dmg: "1d4+Atk", spd: "1M", range: "Melee/Thrown" },
    { name: "Greatsword", dmg: "2d6+Atk", spd: "3M", range: "Melee" },
  ],
  Ranged: [
    { name: "Shortbow", dmg: "1d6", spd: "2M", range: "Far" },
    { name: "Crossbow", dmg: "1d8", spd: "3M", range: "Far" },
    { name: "Hand Crossbow", dmg: "1d6", spd: "1M", range: "Near" },
  ],
  Arcane: [
    { name: "Staff", dmg: "1d6+Atk", spd: "2M", range: "Near" },
    { name: "Wand", dmg: "1d4+Atk", spd: "1M", range: "Near" },
    { name: "Tome", dmg: "—", spd: "—", range: "—" },
  ],
};

const SPELLS = {
  Wizard: [
    {
      name: "Magic Missile",
      school: "Force",
      cost: "2M",
      range: "Far",
      desc: "Auto-hit. 1d4+2 force per missile (3 missiles).",
    },
    {
      name: "Shield",
      school: "Abjuration",
      cost: "1M",
      range: "Self",
      desc: "+5 Defense until next turn. Reaction.",
    },
    {
      name: "Burning Hands",
      school: "Fire",
      cost: "2M",
      range: "Near",
      desc: "Cone of fire. 3d6 fire damage, save for half.",
    },
    {
      name: "Sleep",
      school: "Enchantment",
      cost: "3M",
      range: "Near",
      desc: "Lowest HP creatures in range fall unconscious.",
    },
  ],
  Sorcerer: [
    {
      name: "Chaos Bolt",
      school: "Wild",
      cost: "2M",
      range: "Far",
      desc: "1d8 random damage type. Doubles chain to new target.",
    },
    {
      name: "Bend Fate",
      school: "Fate",
      cost: "1M",
      range: "Self",
      desc: "After seeing a roll, force a reroll. Take either result.",
    },
    {
      name: "Surge",
      school: "Wild",
      cost: "0M",
      range: "Self",
      desc: "Once per round: +1d6 to any damage roll.",
    },
  ],
  Witch: [
    {
      name: "Wither",
      school: "Blood",
      cost: "2M",
      range: "Near",
      desc: "2d6 necrotic. Regain HP equal to half damage dealt.",
    },
    {
      name: "Cursed Ground",
      school: "Hex",
      cost: "3M",
      range: "Near",
      desc: "Zone becomes cursed. Enemies take 1d4 necrotic/turn.",
    },
    {
      name: "Bind Spirit",
      school: "Spirit",
      cost: "2M",
      range: "Near",
      desc: "Summon bound spirit that attacks once/round (1d6).",
    },
  ],
  Martial: [],
};

const ARMOR = [
  { key: "Light", label: "Light armor", def: 1 },
  { key: "Medium", label: "Medium armor", def: 2 },
  { key: "Heavy", label: "Heavy armor", def: 4 },
  { key: "Robes", label: "Arcane robes", def: 0 },
];

const SOURCES = ["Arcane", "Natural", "Psionic", "Divine", "Blood", "Chi"];
const TABS = [
  "Overview",
  "Features",
  "Powers",
  "Weapons",
  "Spells",
  "Skills",
  "Equipment",
];
