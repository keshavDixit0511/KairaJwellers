// const mongoose = require("mongoose");

// const Jewellery = mongoose.model(
//   "kairajewellers", // collect kaira name
//   new mongoose.Schema({}, { strict: false }), // no schema
//   "kairajewellers" // explicitly set collection name
// );

// module.exports = Jewellery;

const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
  // PAGE 1: Landing Page Data
  page1: {
    // Used in Hero.jsx
    quote: { type: String, default: "" },

    // Used in Gallery.jsx (The cinematic scaling video)
    video: { type: String, default: "" },

    // Used in About.jsx
    about: {
      LargeText: { type: String, default: "" },
      numberData: [{
        num: { type: String }, // e.g., "500"
        name: { type: String } // e.g., "Happy Customers"
      }]
    },

    // Used in Categories.jsx
    categories: [{
      name: { type: String },
      img: { type: String }
    }],

    // Used in BlackBanner.jsx (Uses indices 0 through 8)
    banner: [{ type: String }], 

    // Used in Testimonials.jsx (Swiper)
    testimonial: [{
      img: { type: String },
      name: { type: String },
      text: { type: String }
    }]
  },

  // PAGE 2: Stores Data
  page2: {
    store: [{
      name: { type: String, required: true },
      address: { type: String },
      phone: { type: String },
      mapsrc: { type: String },
      image: { type: String }
    }],
    // Note: Your routes showed franchise being saved in page2 sometimes
    franchise: [{
      name: { type: String },
      role: { type: String },
      image: { type: String }
    }]
  },

  // PAGE 3: Gallery Data
  page3: {
    gallery: {
      carousel: [{ type: String }],
      diamond: [{ type: String }],
      gold: [{ type: String }],
      silver: [{ type: String }]
    }
  },

  page4: {
    // This matches the "res.data.user" logic in your Franchise.jsx
    user: [{
      name: { type: String },
      role: { type: String },
      image: { type: String } // URL to the image
    }],
  }

}, { 
  strict: false, // Allows you to add page5, page6 etc. later without changing this file
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Using the defensive compilation pattern to prevent OverwriteModelError
const Jewellery = mongoose.models.LandingPage || mongoose.model("LandingPage", landingPageSchema);

module.exports = Jewellery;

