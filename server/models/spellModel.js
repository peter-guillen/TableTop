const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  damage: String,
  healing: String,
  effect: String,
  range: String,
  duration: String,
});

module.exports = mongoose.model("Spell", SpellSchema);
