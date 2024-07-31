var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const consumable_controller = require("../controllers/consumableController");

router.get("/", consumable_controller.consumables_list);

module.exports = router;
