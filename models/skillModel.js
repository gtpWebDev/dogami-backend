const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, enum: dogInfo.skills },
  },
  { collection: "skills" }
);

module.exports = mongoose.connection.model("Skill", SkillSchema);
