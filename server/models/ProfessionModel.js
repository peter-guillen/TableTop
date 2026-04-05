const mongoose = require("mongoose");

// Sub-schema for level-up features
const LevelFeatureSchema = new mongoose.Schema({
  level: { type: Number }, // e.g. 1, 2, 3...20
  name: { type: String }, // e.g. "Action Surge"
  description: String,
  proficiencyBonus: Number, // +2 at lvl 1, scales up
  hitDie: Number, // HP gained this level
});

// Sub-schema for spell slots per level (like D&D spell slot table)
const SpellSlotSchema = new mongoose.Schema({
  level: Number, // character level
  slots: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
    6: { type: Number, default: 0 },
    7: { type: Number, default: 0 },
    8: { type: Number, default: 0 },
    9: { type: Number, default: 0 },
    10: { type: Number, default: 0 },
  },
});

// Sub-schema for saving throw proficiencies
const SavingThrowSchema = new mongoose.Schema({
  strength: { type: Boolean, default: false },
  dexterity: { type: Boolean, default: false },
  constitution: { type: Boolean, default: false },
  intelligence: { type: Boolean, default: false },
  wisdom: { type: Boolean, default: false },
  charisma: { type: Boolean, default: false },
});

const ProfessionSchema = new mongoose.Schema(
  {
    // Core identity
    title: { type: String, unique: true }, // e.g. "Wizard"
    description: String, // Flavor text
    hitDie: { type: Number }, // e.g. 6, 8, 10, 12

    // Ability score used for spellcasting (null if non-caster)
    spellcastingAbility: {
      type: String,
      enum: [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
        null,
      ],
      default: null,
    },

    // Proficiencies
    armorProficiencies: [{ type: String }], // e.g. ["light", "medium", "shields"]
    weaponProficiencies: [{ type: String }], // e.g. ["simple", "martial", "longsword"]
    toolProficiencies: [{ type: String }], // e.g. ["thieves' tools", "herbalism kit"]
    savingThrows: SavingThrowSchema,

    // Skill choices at character creation
    skillChoices: {
      choose: { type: Number, default: 2 }, // How many skills the player picks
      from: [{ type: String }], // Pool of available skills
    },

    // Level progression (1–20)
    levels: [LevelFeatureSchema],

    // Spell slots table (only populated for caster classes)
    spellSlots: [SpellSlotSchema],

    // Subclass info
    subclassName: String, // e.g. "Arcane Tradition", "Martial Archetype"
    subclassLevel: Number, // Level at which subclass is chosen, e.g. 3

    // Starting equipment (simple list or references)
    startingEquipment: [{ type: String }],

    // Meta
    sourceBook: { type: String, default: "Player's Handbook" },
    isPlayable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profession", ProfessionSchema);
