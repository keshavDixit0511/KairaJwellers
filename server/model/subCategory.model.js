const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, required: true }, // e.g. Rings, Necklaces
  photos: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Photo" }
  ]
}, { timestamps: true });

module.exports = mongoose.model("SubCategory", SubCategorySchema);
