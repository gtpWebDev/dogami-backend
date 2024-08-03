const passport = require("passport");

const DogamiImages = require("../models/dogamiImgModel");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

/**
 * ---ADD AN ARRAY OF DOGAMI IMG DATA---
 * NOTE THIS IS A ONE-OFF EXERCISE NOT TO BE MADE GENERALLY AVAILABLE
 * THEREFORE DOES NOT INCLUDE AUTH, ETC.
 */

exports.dogami_add_array = asyncHandler(async (req, res, next) => {
  const items = req.body;
  const addArray = await DogamiImages.insertMany(items);
  res.status(200).json({ success: true });
});

exports.dogami_img_detail = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Note, only collecting image, so no authorization

  // Collect and return the dogami and track strat information
  asyncHandler(async (req, res, next) => {
    DogamiImages.findOne({ dogami_official_id: req.params.dogamiId })
      .then((dogamiImg) => {
        if (!dogamiImg) {
          return res
            .status(401)
            .json({ success: false, msg: "could not find dogamiImg" });
        }
        res.status(200).json({ success: true, data: dogamiImg });
      })
      .catch((err) => {
        next(err);
      });
  }),
];
