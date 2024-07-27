const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 20 }, // e.g. "D5"
    trial_track: { type: Boolean, required: true },
  },
  { collection: "tracks" }
);

// Virtual for track URL - may be needed?
// DogamiSchema.virtual("url").get(function () {
//   return `/track/${this._id}`;
// });

TrackSchema.virtual("image_loc").get(function () {
  return `/public/trackImages${this.name}`;
});

module.exports = mongoose.connection.model("Track", TrackSchema);
