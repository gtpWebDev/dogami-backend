const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/** Note, decided against sub schema which is better when re-used across multiple schema,
 *  or where validation rules are important.
 *  Here, I will be populating the draw_aarays rather than users
 *  and it will only be used in a single location
 *
 * const drawArrayItemSchema = new Schema({
 *   skill: { type: Schema.Types.ObjectId, ref: "Skill" },
 *   width: { type: Number, required: true },
 * });
 *
 */

const TrackSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 20 }, // e.g. "D5"
    trial_track: { type: Boolean, required: true },
    draw_array: [
      {
        skill: { type: Schema.Types.ObjectId, ref: "Skill" },
        width: { type: Number, required: true },
      },
    ],
  },
  { collection: "tracks" }
);

module.exports = mongoose.connection.model("Track", TrackSchema);
