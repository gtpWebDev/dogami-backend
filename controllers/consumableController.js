const passport = require("passport");

const Consumable = require("../models/consumableModel");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

/* ---REQUEST FOR LIST OF ALL CONSUMABLES--- */

exports.consumables_list = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // No authorisation needed to collect list of consumables

  // Collect and return full list of consumables
  asyncHandler(async (req, res, next) => {
    const consumables = await Consumable.find().populate("skills").exec();
    if (!consumables) {
      return res.status(401).json({
        success: false,
        msg: "could not find any consumables",
      });
    }

    const response = {
      success: true,
      data: consumables,
    };
    res.status(200).json(response);
  }),
];
