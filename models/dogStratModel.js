const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DogStratSchema = new Schema(
  {
    is_private: { type: Boolean, required: true }, // whether user wants the information shared
    dogami_id: { type: Schema.Types.ObjectId, ref: "Dogami" },
    track_id: { type: Schema.Types.ObjectId, ref: "Track" },
    power_1: { type: Schema.Types.ObjectId, ref: "Power" },
    power_2: { type: Schema.Types.ObjectId, ref: "Power" },
    consumable_1: { type: Schema.Types.ObjectId, ref: "Consumable" },
    strat_best_time: { type: Number, required: true }, // best time for this specific strat
  },
  { collection: "dog_strats" }
);

// Virtual for track strat URL - may be needed?
// DogamiSchema.virtual("url").get(function () {
//   return `/track/${this._id}`;
// });

module.exports = mongoose.connection.model("DogStrat", DogStratSchema);
