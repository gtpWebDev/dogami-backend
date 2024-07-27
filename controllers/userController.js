const passport = require("passport");
const User = require("../models/userModel");
// required for populate
const Dogami = require("../models/dogamiModel");

const { body, validationResult } = require("express-validator");

const passwordUtils = require("../lib/passwordUtils");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

// user attempts to register
exports.register_post = [
  // Validate and sanitize received inputs (username and password).
  body("username", "First name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be a minimum of 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log("errors array", errors.array());

    if (!errors.isEmpty()) {
      // There are errors. Send a message that registration has failed.

      // construct helpful error message
      let errorMsg = "";
      errors.array().forEach((element) => {
        errorMsg += element.msg + " ";
      });
      errorMsg = errorMsg.slice(0, -1);

      res.status(400).json({ success: false, msg: errorMsg });
    } else {
      // Data from form is valid.

      // Check if Condition with same name already exists.
      const userExists = await User.findOne({
        username: req.body.username,
      })
        .collation({ locale: "en", strength: 2 }) // basically case insensitive
        .exec();

      if (userExists) {
        res.status(400).json({
          success: false,
          msg: "Username already exists. Please use another.",
        });
      } else {
        // apply the local strategy to generate a salt and password hash from the password
        const saltAndHash = passwordUtils.generatePassword(req.body.password);
        const salt = saltAndHash.salt;
        const passwordHash = saltAndHash.passwordHash;

        const newUser = new User({
          username: req.body.username,
          hash: passwordHash,
          salt: salt,
          admin: false,
          owned_dogs: [],
        });

        // add the new user to the database
        newUser.save().then((user) => {
          // issue a JWT and return it
          const jwt = passwordUtils.issueJWT(user);

          // console.log("token", jwt.token);

          res.status(200).json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
          });
        });
      }
    }
  }),
];

// user attempts to login
exports.login_post = asyncHandler(
  // if failureRedirect and successRedirect are used above, this next middleware function would not be called
  async (req, res, next) => {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          console.log("Could not find user:");
          return res
            .status(401)
            .json({ success: false, msg: "could not find user" });
        }

        // Function defined at bottom of app.js
        const isValid = passwordUtils.validatePassword(
          req.body.password,
          user.hash,
          user.salt
        );

        if (isValid) {
          const jwt = passwordUtils.issueJWT(user);
          res.status(200).json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
          });
        } else {
          res
            .status(401)
            .json({ success: false, msg: "you entered the wrong password" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
);

// request for dashboard page
exports.dashboard_get = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  asyncHandler(async (req, res, next) => {
    // need to collect both the user and their owned dogs

    User.findById(req.user._id)
      .populate("owned_dogs")
      .then((user) => {
        if (!user) {
          console.log("Could not find user:");
          return res
            .status(401)
            .json({ success: false, msg: "could not find user" });
        }
        // console.log("User details of logged in profile from database", user);
        res.status(200).json({ success: true, data: user });
      })
      .catch((err) => {
        next(err);
      });
  }),
];
