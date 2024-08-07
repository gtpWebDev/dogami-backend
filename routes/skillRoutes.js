var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const skill_controller = require("../controllers/skillController");

router.get("/", skill_controller.skills_list);

module.exports = router;
