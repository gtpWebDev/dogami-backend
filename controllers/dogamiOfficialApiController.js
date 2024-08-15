const passport = require("passport");

const DogamiOfficialApi = require("../models/dogamiOfficialApiModel");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

exports.dogami_detail = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // authorisation not needed - used to add a dog

  // Collect and return the dogami information
  asyncHandler(async (req, res, next) => {
    DogamiOfficialApi.findOne({ dogami_official_id: req.params.dogamiId })
      .then((dogamiData) => {
        if (!dogamiData) {
          return res
            .status(401)
            .json({ success: false, msg: "could not find dogami" });
        }
        res.status(200).json({ success: true, data: dogamiData.data });
      })
      .catch((err) => {
        next(err);
      });
  }),
];
