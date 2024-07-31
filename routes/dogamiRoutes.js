var express = require("express");
var router = express.Router();

// creates and a modular, mountable route handler

const dogami_controller = require("../controllers/dogamiController");

// specific order to ensure correct route kicks in

// Update a single Dogami - not needed as yet while all dogami info is from proxy.dogami
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

// POST request to add a new dog strat for a specific Dogami
router.post(
  "/:dogamiId/strat/create",
  dogami_controller.dogami_strat_create_post
);

// DELETE request to delete a dog strat
router.delete(
  "/:dogamiId/strats/:stratId",
  dogami_controller.dogami_strat_delete
);

// GET request for all dog strats for a specific Dogami
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
