const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const ConsumableTypeSchema = new Schema(
  {
    name: { type: String, required: true, enum: dogInfo.consumable_types }, // e.g. "Weak"
    percentage_boost: { type: Number, required: true }, // e.g. 40
  },
  { collection: "consumable_types" }
);

module.exports = mongoose.connection.model(
  "ConsumableType",
  ConsumableTypeSchema
);
