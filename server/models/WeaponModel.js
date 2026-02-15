const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  properties: String,
  rarity: String,
  damage: String,
  range: String,
  weight: String,
  value: String,
  skills: String,
});

module.exports = mongoose.model("Weapon", WeaponSchema);

// type: "",
// tags: [],
// damageType
// special
// requirements
