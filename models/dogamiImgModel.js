const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DogamiImgSchema = new Schema(
  {
    dogami_official_id: { type: Number, required: true },
    img_url: { type: String, required: true },
  },
  { collection: "dogami_images" }
);

module.exports = mongoose.connection.model("DogamiImages", DogamiImgSchema);
