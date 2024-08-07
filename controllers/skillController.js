const passport = require("passport");

const Skill = require("../models/skillModel");

// short form, applying try {} catch(err)
const asyncHandler = require("express-async-handler");

/* ---REQUEST FOR LIST OF ALL SKILLS--- */

exports.skills_list = [
  // passport middleware applies verifyCallback
  passport.authenticate("jwt", { session: false }), // emits user in response

  // No authorisation needed to collect list of skills

  // Collect and return full list of skills
  asyncHandler(async (req, res, next) => {
    const skills = await Skill.find().exec();

    if (!skills) {
      return res.status(401).json({
        success: false,
        msg: "could not find any skills",
      });
    }

    const response = {
      success: true,
      data: skills,
    };
    res.status(200).json(response);
  }),
];
