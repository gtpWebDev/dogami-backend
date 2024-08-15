const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This schema is for data that will 100% replicate that available
 * at the following endpoint:
 * https://proxy.dogami.com/metadata/dogami/ids/15741
 * The intention is to future-proof the app, so it has no external
 * dependencies.
 * This will be used instead of the official dogami API for this
 * version of the app.
 * This is being populated as a one-off exercise, using lib/proxy.js
 * It will be queried as a simple get, mirroring the function
 * of the official dogami endpoint - not sensibly structured but
 * intentional.
 */

const DogamiOfficialApiSchema = new Schema(
  {
    dogami_official_id: { type: Number, required: true },
    data: { type: Schema.Types.Mixed },
  },
  { collection: "dogami_official_api" }
);

// Optimise for searches by dogami_official_id
DogamiOfficialApiSchema.index({ dogami_official_id: 1 });

module.exports = mongoose.connection.model(
  "DogamiOfficialApi",
  DogamiOfficialApiSchema
);
