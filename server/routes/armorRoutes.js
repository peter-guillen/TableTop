const express = require("express");
const armorController = require("../controllers/armorController");
const crudController = require("../controllers/crudController");
const crudRoutes = require("./crudRoutes");

const router = express.Router();

router.use("/", crudRoutes(armorController));
router.post("/armorDefense", armorController.armorDefense);

module.exports = router;
