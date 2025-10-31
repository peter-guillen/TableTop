const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
  name: String,
  description: String,
  domain: String,
  school: String,
  category: String,
  damage: String,
  healing: String,
  effect: String,
  casting: String,
  range: String,
  duration: String,
});

module.exports = mongoose.model("Spell", SpellSchema);
