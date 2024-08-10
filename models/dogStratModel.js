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

/**
 * NOTE THIS WILL ADD INDEXES WHEN APPLICATION CONNECTS TO DATABASE
 * THIS WOULD HAPPEN WITH EACH OUTAGE??
 * LOOK AT MIGRATION TOOLS SUCH AS migrate-mongo TO BETTER CONTROL WHEN
 * INDEXES ARE CREATED - E.G DEPLOYMENT, VERSIONING
 */

// Optimises filter by dogami_id, dogami_page_get
DogStratSchema.index({ dogami_id: 1 });
// Optimises sort by track_id and strat_best_time, dogami_page_get
DogStratSchema.index({ track_id: 1, strat_best_time: 1 });

module.exports = mongoose.connection.model("DogStrat", DogStratSchema);
