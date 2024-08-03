var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const dogami_img_controller = require("../controllers/dogamiImgController");

// POST an array of data
// THIS IS DISABLED AS IT WAS A ONE-OFF
// router.post("/add-array", dogami_img_controller.dogami_add_array);

router.get("/:dogamiId", dogami_img_controller.dogami_img_detail);

module.exports = router;
