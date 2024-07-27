var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const dogami_controller = require("../controllers/dogamiController");

// specific order to ensure correct route kicks in

// Create a new Dogami.
// router.post("/dogami/create", dogami_controller.dogami_create_post);

// Delete a single Dogami.
// router.delete("/dogami/:id", dogami_controller.dogami_delete);

// Update a single Dogami.
// Best practice...
// Post used for partial or non-idempotent (e.g. add) updates.
// Put used for complete and idempotent replacements.
// router.post("/dogami/:id/update", dogami_controller.dogami_update_post);

/* --- PAGE ROUTES--- */
// Can generally put these first, as they are fully-specific

router.get(
  "/:dogamiId/track/:trackId/frontend-dogami-track-page",
  dogami_controller.dogami_track_page_get
);

router.get(
  "/:dogamiId/frontend-dogami-page",
  dogami_controller.dogami_page_get
);

/* --- API ROUTES--- */

// GET request for all strats for a specific Dogami
router.get("/:dogamiId/strats", dogami_controller.dogami_strat_list);

// GET request for a specific Dogami (catering for query parameters).
router.get("/:dogamiId", dogami_controller.dogami_detail);

// DELETE request to delete an existing dogami
router.delete("/:dogamiId", dogami_controller.dogami_delete);

// POST request to add a new Dogami
router.post("/create", dogami_controller.dogami_create_post);

// GET request for list of all Dogamis.
// router.get("/dogamis", dogami_controller.dogami_list);

module.exports = router;
