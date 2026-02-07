const mongoose = require("mongoose");

const JewellerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. Diamond
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }
    ], // Reference to SubCategory collection
    photos: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Photo" }
    ], // Reference to Photo collection
    banner: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jewellery", JewellerySchema);
