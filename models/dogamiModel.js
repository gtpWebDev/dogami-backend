const mongoose = require("mongoose");

const dogInfo = require("../constants/dogInformation");

const Schema = mongoose.Schema;

const skillSchema = new Schema({
  rank: { type: String, required: true, enum: dogInfo.dogami_rank },
  base_level: { type: Number, required: true },
  trained_level: { type: Number, required: true },
});

const DogamiSchema = new Schema(
  {
    dogami_official_id: { type: Number, required: true },
    name: { type: String, required: true, maxLength: 100 },
    breed: { type: String, required: true, enum: dogInfo.breeds },
    dog_collection: { type: String, required: true, enum: dogInfo.collection },
    img_url: { type: String, required: true },
    status: { type: String, required: true, enum: dogInfo.dogami_status },
    level: {
      type: Number,
      required: [true, "Level is required"],
      min: [1, "Level must be at least 1"],
      max: [50, "Age must be at most 50"],
    },
    rarity: { type: String, required: true, enum: dogInfo.dogami_rarity },
    powers: [{ type: Schema.Types.ObjectId, ref: "Power" }],
    velocity_stats: skillSchema,
    swim_stats: skillSchema,
    jump_stats: skillSchema,
    balance_stats: skillSchema,
    might_stats: skillSchema,
    instinct_stats: skillSchema,
  },
  { collection: "dogamis" }
);

DogamiSchema.virtual("dogami_official_url").get(function () {
  return `https://marketplace.dogami.com/dogami/${this.dogami_official_id}`;
});

module.exports = mongoose.connection.model("Dogami", DogamiSchema);
