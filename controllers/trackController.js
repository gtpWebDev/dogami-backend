const passport = require("passport");

const Track = require("../models/trackModel");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

/* ---REQUEST FOR SINGLE TRACK DETAIL--- */

exports.tracks_get = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // No authorisation needed to collect information on a track

  // Collect and return the dogami and track information
  asyncHandler(async (req, res, next) => {
    Track.findById(req.params.trackId)
      .populate({
        path: "draw_array.skill",
        model: "Skill",
      })
      .then((track) => {
        if (!track) {
          return res
            .status(401)
            .json({ success: false, msg: "could not find track" });
        }
        res.status(200).json({ success: true, data: track });
      })
      .catch((err) => {
        next(err);
      });
  }),
];

exports.tracks_list = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // No authorisation needed to collect list of tracks

  // Collect and return full list of tracks
  asyncHandler(async (req, res, next) => {
    const tracks = await Track.find().exec();

    if (!tracks) {
      return res.status(401).json({
        success: false,
        msg: "could not find any tracks",
      });
    }

    const response = {
      success: true,
      data: tracks,
    };
    res.status(200).json(response);
  }),
];
