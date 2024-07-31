const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const ConsumableSchema = new Schema(
  {
    name: { type: String, required: true, enum: dogInfo.consumables }, // e.g. "Hurryberry"
    skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    consumable_type: { type: Schema.Types.ObjectId, ref: "ConsumableType" },
  },
  { collection: "consumables" }
);

ConsumableSchema.virtual("image_loc").get(function () {
  return `/public/consumableImages${this.name}`;
});

module.exports = mongoose.connection.model("Consumable", ConsumableSchema);
