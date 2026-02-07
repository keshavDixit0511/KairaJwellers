const mongoose = require("mongoose");

const Jewellery = mongoose.model(
  "kairajewellers", // collect kaira name
  new mongoose.Schema({}, { strict: false }), // no schema
  "kairajewellers" // explicitly set collection name
);

module.exports = Jewellery;


