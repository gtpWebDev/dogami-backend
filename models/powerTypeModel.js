const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const PowerTypeSchema = new Schema(
  {
    name: { type: String, required: true, enum: dogInfo.power_types }, // e.g. "Fish"
  },
  { collection: "power_types" }
);

module.exports = mongoose.connection.model("PowerType", PowerTypeSchema);
