const express = require("express");
const router = express.Router();

const { getLibrary } = require("../controllers/libraryController");

router.get("/", getLibrary);

module.exports = router;
