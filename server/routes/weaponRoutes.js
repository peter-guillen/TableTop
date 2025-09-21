const express = require("express");
const weaponController = require("../controllers/weaponController");
const crudController = require("../controllers/crudController");
const crudRoutes = require("./crudRoutes");

const router = express.Router();

router.use("/", crudRoutes(weaponController));
router.post("/weaponAttack", weaponController.weaponAttack);

module.exports = router;
