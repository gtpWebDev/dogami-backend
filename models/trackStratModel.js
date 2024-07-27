const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackStratSchema = new Schema(
  {
    is_private: { type: Boolean, required: true }, // whether user wants the information shared
    dogami_id: { type: Schema.Types.ObjectId, ref: "Dogami" },
    track_id: { type: Schema.Types.ObjectId, ref: "Track" },
    power_1: { type: String, maxLength: 10 }, // placeholder, will be a power objectId
    power_2: { type: String, maxLength: 10 }, // placeholder, will be a power objectId
    consumable_1: { type: String, maxLength: 10 }, // placeholder, will be a consumable objectId
    strat_best_time: { type: Number, required: true }, // best time for this specific strat
  },
  { collection: "track_strats" }
);

// Virtual for track strat URL - may be needed?
// DogamiSchema.virtual("url").get(function () {
//   return `/track/${this._id}`;
// });

module.exports = mongoose.connection.model("TrackStrat", TrackStratSchema);
