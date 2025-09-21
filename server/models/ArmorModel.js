const mongoose = require("mongoose");

const ArmorSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  defense: String,
  weight: String,
});

module.exports = mongoose.model("Armor", ArmorSchema);
