const passport = require("passport");

const Power = require("../models/powerModel");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

/* ---REQUEST FOR LIST OF ALL POWERS--- */

exports.powers_list = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // No authorisation needed to collect list of powers

  // Collect and return full list of powers
  asyncHandler(async (req, res, next) => {
    const powers = await Power.find().exec();

    if (!powers) {
      return res.status(401).json({
        success: false,
        msg: "could not find any powers",
      });
    }

    const response = {
      success: true,
      data: powers,
    };
    res.status(200).json(response);
  }),
];
