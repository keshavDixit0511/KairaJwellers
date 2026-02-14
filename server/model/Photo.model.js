// const mongoose = require('mongoose');

// const PhotoSchema = new mongoose.Schema({
//   imageName: { type: String, required: true }, // e.g. Elegant Diamond Ring
//   image: { type: String, required: true } // image URL
// }, { timestamps: true });

// module.exports = mongoose.model("Photo", PhotoSchema);

const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema(
  {
    imageName: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
    }, // The URL or path to the photo
    
    // CRITICAL: Link to the top-level category (Gold/Silver/Diamond)
    // This allows the "View All" feature to work instantly.
    jewelleryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Jewellery", 
      required: true,
      index: true // Makes searching by category very fast
    },
    
    // Link to the specific subcategory
    subCategoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "SubCategory", 
      required: true,
      index: true // Makes searching by subcategory very fast
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", PhotoSchema);