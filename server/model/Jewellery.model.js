// const mongoose = require("mongoose");

// const JewellerySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // e.g. Diamond
//     subcategories: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }
//     ], // Reference to SubCategory collection
//     photos: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "Photo" }
//     ], // Reference to Photo collection
//     banner: { type: String, required: true }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Jewellery", JewellerySchema);


const mongoose = require("mongoose");

const JewellerySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    }, // e.g., "gold", "silver"
    banner: { 
      type: String, 
      required: true 
    }, // URL for the top banner image
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jewellery", JewellerySchema);