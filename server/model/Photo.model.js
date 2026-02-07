const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  imageName: { type: String, required: true }, // e.g. Elegant Diamond Ring
  image: { type: String, required: true } // image URL
}, { timestamps: true });

module.exports = mongoose.model("Photo", PhotoSchema);