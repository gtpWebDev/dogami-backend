var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const dogami_off_api_controller = require("../controllers/dogamiOfficialApiController");

/**
 * Likely to minimise this to collecting a single dogami
 * Option to collect many, mirroring the endpoint?
 */

router.get("/:dogamiId", dogami_off_api_controller.dogami_detail);

module.exports = router;
