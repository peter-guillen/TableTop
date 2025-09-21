const Armor = require("./../models/ArmorModel");
const crudController = require("./crudController");

const base = crudController(Armor);

async function armorDefense(req, res) {
  // Special case function
}

module.exports = { ...base, armorDefense };
