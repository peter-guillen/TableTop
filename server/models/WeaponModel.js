const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  damage: String,
  effect: String,
  range: String,
});

module.exports = mongoose.model("Weapon", WeaponSchema);
