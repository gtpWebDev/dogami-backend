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
