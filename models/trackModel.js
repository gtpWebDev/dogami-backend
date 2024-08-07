const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const drawArrayItemSchema = new Schema({
  skill: { type: Schema.Types.ObjectId, ref: "Skill" },
  width: { type: Number, required: true },
});

const TrackSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 20 }, // e.g. "D5"
    trial_track: { type: Boolean, required: true },
    draw_array: [drawArrayItemSchema],
  },
  { collection: "tracks" }
);

module.exports = mongoose.connection.model("Track", TrackSchema);
