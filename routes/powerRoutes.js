var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const power_controller = require("../controllers/powerController");

router.get("/", power_controller.powers_list);

module.exports = router;
