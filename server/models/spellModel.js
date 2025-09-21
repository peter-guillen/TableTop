const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
  name: String,
  description: String,
  domain: { type: String, enum: ["Animancy", "Ergomancy"] },
  school: {
    type: String,
    enum: [
      "Temperature",
      "Electromagnetism",
      "Luminosity",
      "Psionic",
      "Soma",
      "Pnuema",
    ],
  },
  category: { type: String, enum: ["Damage", "Healing", "Boon", "Bane"] },
  damage: String,
  healing: String,
  effect: String,
  range: String,
  casting: String,
  duration: String,
});

module.exports = mongoose.model("Spell", SpellSchema);
