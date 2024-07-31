var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const track_controller = require("../controllers/trackController");

router.get("/:trackId", track_controller.tracks_get);

router.get("/", track_controller.tracks_list);

module.exports = router;
