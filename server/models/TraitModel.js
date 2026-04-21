const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: Number, default: 1 },
});

module.exports = mongoose.model("Trait", TraitSchema);
