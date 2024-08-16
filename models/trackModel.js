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
    display_order: { type: Number, required: true }, // assists dropdown list being ordered as required
    name: { type: String, required: true, maxLength: 20 }, // e.g. "D5"
    trial_track: { type: Boolean, required: true },
    draw_array: [
      {
        skill: { type: Schema.Types.ObjectId, ref: "Skill" },
        width: { type: Number, required: true },
      },
    ],
    // skill_sequence exists purely to aid a filter. e.g. C2 is "YBRGYGBY"
    // when they add combo obstacles: "YBR[GB]YRB"
    // chars could be limited but will be controlled by admin
    obstacle_sequence: { type: String, required: true, maxLength: 50 },
  },
  { collection: "tracks" }
);

module.exports = mongoose.connection.model("Track", TrackSchema);
