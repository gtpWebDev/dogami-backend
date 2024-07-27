const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const DogamiSchema = new Schema(
  {
    dogami_official_id: { type: Number, required: true },
    name: { type: String, required: true, maxLength: 100 },
    breed: { type: String, required: true, enum: dogInfo.breeds },
    dog_collection: { type: String, required: true, enum: dogInfo.collection },
    img_url: { type: String, required: true },
    // lots more to add, see spreadsheet
  },
  { collection: "dogamis" }
);

DogamiSchema.virtual("dogami_official_url").get(function () {
  return `https://marketplace.dogami.com/dogami/${this.dogami_official_id}`;
});

module.exports = mongoose.connection.model("Dogami", DogamiSchema);
