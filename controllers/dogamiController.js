const passport = require("passport");

// shouldn't have to define this?
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Dogami = require("../models/dogamiModel");
const TrackStrat = require("../models/trackStratModel");
const Track = require("../models/trackModel");
const DogamiImage = require("../models/dogamiImgModel");

const authMiddleware = require("../lib/authMiddleware");
const dogInfo = require("../constants/dogInformation");
const tidyErrorArray =
  require("../lib/requestValidation").constructValidationErrorMessage;

const { query, body, param, validationResult } = require("express-validator");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

/* ---REQUEST FOR SINGLE DOGAMI DETAIL--- */

exports.dogami_detail = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Authorise - check that the user in the JWT owns the dog
  authMiddleware.ownDogami,

  // Collect and return the dogami and track strat information
  asyncHandler(async (req, res, next) => {
    Dogami.findById(req.params.dogamiId)
      .then((dogami) => {
        if (!dogami) {
          return res
            .status(401)
            .json({ success: false, msg: "could not find dogami" });
        }
        res.status(200).json({ success: true, data: dogami });
      })
      .catch((err) => {
        next(err);
      });
  }),
];

/* ---REQUEST FOR ALL STRATS FOR A SINGLE DOGAMI--- */

exports.dogami_strats = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Authorise - check that the user in the JWT owns the dog
  authMiddleware.ownDogami,

  asyncHandler(async (req, res, next) => {
    TrackStrat.find({ dogami_id: req.params.dogamiId })
      .populate("track_id")
      .populate("dogami_id")
      .then((strategy) => {
        if (!strategy) {
          return res.status(401).json({
            success: false,
            msg: "could not find strat for this dogami",
          });
        }
        const output = {
          success: true,
          data: strategy,
        };
        res.status(200).json({ success: true, data: output });
      })
      .catch((err) => {
        next(err);
      });
  }),
];

/* ---REQUEST TAILORED TO DATA NEEDED BY FRONTEND DOGAMI PAGE --- */

exports.dogami_page_get = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Authorise - check that the user in the JWT owns the dog
  authMiddleware.ownDogami,

  // Collect and return the dogami and track strat information
  asyncHandler(async (req, res, next) => {
    const [dogami, allTrackStratsForDogami] = await Promise.all([
      Dogami.findById(req.params.dogamiId).exec(),
      // may be possible optimise by querying the minimum time for each track
      TrackStrat.find({ dogami_id: req.params.dogamiId })
        .populate("track_id")
        .exec(),
    ]);

    const response = {
      success: true,
      data: {
        dogami: dogami,
        trackStrats: allTrackStratsForDogami,
      },
    };

    res.status(200).json(response);
  }),
];

/* ---REQUEST TAILORED TO DATA NEEDED BY FRONTEND DOGAMI TRACK PAGE --- */

exports.dogami_track_page_get = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Authorise - check that the user in the JWT owns the dog
  authMiddleware.ownDogami,

  // Collect and return the dogami and track information
  asyncHandler(async (req, res, next) => {
    // important to check dog exists and track exists for data integrity
    const [dogami, track, stratsForDogamiTrack] = await Promise.all([
      Dogami.findById(req.params.dogamiId).exec(),
      Track.findById(req.params.trackId).exec(),
      TrackStrat.find({
        dogami_id: req.params.dogamiId,
        track_id: req.params.trackId,
      }).exec(),
    ]);

    if (!dogami || !track) {
      return res.status(401).json({
        success: false,
        msg: "could not find this dogami / track combination",
      });
    }

    const response = {
      success: true,
      data: {
        dogami: dogami,
        track: track,
        dogamiTrackStrats: stratsForDogamiTrack,
      },
    };

    res.status(200).json(response);
  }),
];

exports.dogami_strat_list = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Authorise - check that the user in the JWT owns the dog
  authMiddleware.ownDogami,

  // Validate and sanitize optional track id filter
  query("track_id", "Track id must be a string")
    .optional()
    .trim()
    .isString()
    .escape(),

  // Collect and return the dogami and track information
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from the filters.
    const validationObject = validationResult(req);

    if (!validationObject.isEmpty()) {
      // Errors exist. Tidy and return them.
      const errorMsg = tidyErrorArray(validationObject);
      res.status(400).json({ success: false, msg: errorMsg });
    } else {
      TrackStrat.find({
        dogami_id: req.params.dogamiId,
        track_id: req.query.track_id,
      })
        .populate("dogami_id")
        .populate("track_id")
        .then((strategy) => {
          if (!strategy) {
            return res.status(401).json({
              success: false,
              msg: "could not find strat for this dogami",
            });
          }
          res.status(200).json({ success: true, data: strategy });
        })
        .catch((err) => {
          next(err);
        });
    }
  }),
];

/* ---ADD NEW DOGAMI--- */

exports.dogami_create_post = [
  // verify user (verifyCallback) and expose user object
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Validate and sanitize the posted data
  body("dogami_official_id", "Official dogami id must be a number")
    .isNumeric()
    .escape(),
  body("name", "Name must contain at least 3 characters")
    .isString()
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("breed")
    .isString()
    .trim()
    .isIn(dogInfo.breeds)
    .withMessage(
      `Dog must be one of the following breeds: ${dogInfo.breeds.join(", ")}`
    ),
  body("dog_collection")
    .isString()
    .trim()
    .isIn(dogInfo.collection)
    .withMessage(
      `Dog must be from one of the following collections: ${dogInfo.collection.join(
        ", "
      )}`
    ),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const validationObject = validationResult(req);

    if (!validationObject.isEmpty()) {
      // Errors exist. Tidy and return them.
      const errorMsg = tidyErrorArray(validationObject);
      res.status(400).json({ success: false, msg: errorMsg });
    } else {
      // Data from form is valid (in this case, duplicate names fine)

      /**
       * collect corresponding img_url data for this dogami_official_id
       * the dogami_images collection is effectively a fixed lookup list
       * that was collected as a one off exercise
       * this was because I did not want an opensea api dependency in this service
       * it is also possible because collection additions happen very rarely
       * the ideal would be dogami providing the img urls in an api
       */

      const dogamiImg = await DogamiImage.findOne({
        dogami_official_id: req.body.dogami_official_id,
      }).exec();

      // Create a santized and validated dogami object
      const dogami = new Dogami({
        dogami_official_id: req.body.dogami_official_id,
        name: req.body.name,
        breed: req.body.breed,
        dog_collection: req.body.dog_collection,
        img_url: dogamiImg.img_url,
      });

      // combined addition of dogami and dogami to owned dogs of user
      const response = await addDogamiTransaction(dogami, req.user._id);
      if (response.success) {
        res.status(200).json({
          success: true,
          msg: response.msg,
        });
      } else {
        res.status(500).json({
          success: false,
          msg: response.msg,
        });
      }
    }
  }),
];

async function addDogamiTransaction(dogami, userId) {
  /**
   * Two updates carried out together or not at all:
   * - adds dogami to dogami collection
   * - adds dogami to owned_dogs array of User with userId
   */
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // add the new Dogami to the Dogami user collection
    const addDog = await dogami.save({ session });
    if (addDog.nModified === 0) {
      throw new Error("New Dogami not added to Dogami collection");
    }

    // add the new Dogami to the owned dogs array in the User collection
    const addDogToUser = await User.updateOne(
      { _id: userId },
      { $push: { owned_dogs: addDog._id } },
      { session }
    );
    if (addDogToUser.nModified === 0) {
      throw new Error("New Dogami not added to the user");
    }

    // Commit the transaction
    await session.commitTransaction();

    return {
      success: true,
      msg: "Dogami successfully added.",
    };
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    return {
      success: false,
      msg: "Error adding dogami to database.",
    };
  } finally {
    session.endSession();
  }
}

exports.dogami_delete = [
  // verify user (verifyCallback) and expose user object
  passport.authenticate("jwt", { session: false }), // emits user in response

  // Validate the dogami id
  param("dogamiId", "Invalid dogami id").isMongoId(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const validationObject = validationResult(req);

    if (!validationObject.isEmpty()) {
      // Errors exist. Tidy and return them.
      const errorMsg = tidyErrorArray(validationObject);
      res.status(400).json({ success: false, msg: errorMsg });
    } else {
      // Data from form is valid (in this case, duplicate names fine)

      const { dogamiId } = req.params;
      const userId = req.user._id;

      // managed deletion of dogami across database
      const response = await deleteDogamiTransaction(userId, dogamiId);
      if (response.success) {
        res.status(200).json({
          success: true,
          msg: response.msg,
        });
      } else {
        res.status(500).json({
          success: false,
          msg: response.msg,
        });
      }
    }
  }),
];

async function deleteDogamiTransaction(userId, dogamiId) {
  /**
   * Updates carried out together or not at all:
   * - Delete all track_strats with dogami_id = dogamiId from track_strats collection
   * - remove dogami_id from owned_dogs array in users collection
   *    (management of database ensures only possible to have this dog in one user document)
   * - delete dogami from dogami collection
   */
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // NOTE: Using promise all was giving MongoDB transient transaction errors.
    // Running the queries sequentially apears to stop this happening.
    // Initial search suggests this is a mongodb issue.
    // Alternative is to revert to promise all and apply a 4 or 5 retries logic.

    // Delete all track_strats with dogami_id = dogamiId from track_strats collection
    const deleteTrackStrats = await TrackStrat.deleteMany(
      { dogami_id: dogamiId },
      { session }
    ).exec();

    // remove dogami_id from owned_dogs array in users collection
    // (management of database ensures only possible to have this dog in one user document)
    const removeDogFromUserOwnedDogs = await User.updateOne(
      { _id: userId },
      { $pull: { owned_dogs: dogamiId } },
      { session }
    ).exec();

    // delete dogami from dogami collection
    const removeDogami = await Dogami.findByIdAndDelete(dogamiId, {
      session,
    }).exec();

    // await Promise.all([
    //   deleteTrackStrats,
    //   removeDogFromUserOwnedDogs,
    //   removeDogami,
    // ]);

    // Commit the transaction
    await session.commitTransaction();

    return {
      success: true,
      msg: "Dogami successfully deleted.",
    };
  } catch (error) {
    // Abort the transaction in case of an error
    console.log(error);
    await session.abortTransaction();
    return {
      success: false,
      msg: "Error deleting dogami from database.",
    };
  } finally {
    session.endSession();
  }
}
