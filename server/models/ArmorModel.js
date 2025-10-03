const mongoose = require("mongoose");

const ArmorSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  defense: String,
  weight: String,
  requirement: String,
  penalty: String,
  material: String,
});

module.exports = mongoose.model("Armor", ArmorSchema);
