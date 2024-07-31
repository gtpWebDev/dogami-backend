const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const PowerSchema = new Schema(
  {
    name: { type: String, required: true, enum: dogInfo.powers }, // e.g. "Fish"
    type: { type: Schema.Types.ObjectId, ref: "PowerType" },
    skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  },
  { collection: "powers" }
);

PowerSchema.virtual("image_loc").get(function () {
  return `/public/powerImages${this.name}`;
});

module.exports = mongoose.connection.model("Power", PowerSchema);
