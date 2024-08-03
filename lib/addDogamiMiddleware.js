const asyncHandler = require("express-async-handler");

const tidyErrorArray =
  require("../lib/requestValidation").constructValidationErrorMessage;

const Powers = require("../models/powerModel");
const User = require("../models/userModel");

const dogInfo = require("../constants/dogInformation");

const { body, validationResult } = require("express-validator");

// custom middleware to transform the power array
module.exports.transformPowersArray = asyncHandler(async (req, res, next) => {
  /**
   *  Convert raw powers array ["Fish", Octopus"]
   *  into an array of Powers ObjectIds
   */

  const rawPowers = req.body.powers;

  const allPowers = await Powers.find();

  // create array with raw powers replaced by powerModel ObjectId
  let newArray = [];

  rawPowers.forEach((rawPower) => {
    let foundPower = false;
    allPowers.forEach((power) => {
      if (power.name === rawPower) {
        newArray.push(power._id);
        foundPower = true;
      }
    });
    if (!foundPower) {
      res.status(400).json({
        success: false,
        msg: "Dogami power not recognised",
      });
    }
  });

  // update powers to objectIds
  req.body.powers = newArray;
  next();
});

/**
 * Check whether dog has already been added for user
 */

module.exports.isDuplicateDog = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("owned_dogs").exec();
  const ownedDogArray = user.owned_dogs;

  // check whether proposed dog is already owned
  let match = false;
  ownedDogArray.forEach((dog) => {
    if (dog.dogami_official_id == req.body.dogami_official_id) match = true;
  });
  if (!match) {
    next();
  } else {
    console.log("SENDING ERROR!");
    res
      .status(400)
      .json({ success: false, msg: "This dog has already been added" });
  }
});

module.exports.isNotBox = [
  body("status")
    .isString()
    .trim()
    .isIn(dogInfo.dogami_status)
    .withMessage("You can't race boxes!")
    .escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const validationObject = validationResult(req);

    if (!validationObject.isEmpty()) {
      // Errors exist. Tidy and return them.
      const errorMsg = tidyErrorArray(validationObject);
      res.status(400).json({ success: false, msg: errorMsg });
    } else {
      next();
    }
  },
];
