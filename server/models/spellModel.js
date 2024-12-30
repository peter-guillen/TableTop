const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model("Spell", SpellSchema);
