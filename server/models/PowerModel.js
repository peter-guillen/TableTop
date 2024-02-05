const mongoose = require("mongoose");

const powerSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model("Power", powerSchema);
