// const mongoose = require('mongoose');

// const SubCategorySchema = new mongoose.Schema({
//   subCategoryName: { type: String, required: true }, // e.g. Rings, Necklaces
//   photos: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Photo" }
//   ]
// }, { timestamps: true });

// module.exports = mongoose.model("SubCategory", SubCategorySchema);

const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true 
    }, // e.g., "jhumkas"
    
    // Reference back to the main category (Gold/Silver)
    parentJewellery: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Jewellery", 
      required: true 
    },
    
    photos: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Photo" }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);