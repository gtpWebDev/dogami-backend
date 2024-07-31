const asyncHandler = require("express-async-handler");

const Powers = require("../models/powerModel");

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
