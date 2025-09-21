const Weapon = require("./../models/WeaponModel");
const crudController = require("./crudController");

const base = crudController(Weapon);

async function weaponAttack(req, res) {
  // Special case function
}

module.exports = { ...base, weaponAttack };
