const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  properties: String,
  weight: String,
  damage: String,
  skills: String,
  range: String,
});

module.exports = mongoose.model("Weapon", WeaponSchema);
