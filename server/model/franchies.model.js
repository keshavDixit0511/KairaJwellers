const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  investmentBudget: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: true
  }
});

const Franchise = mongoose.model("Franchise", franchiseSchema);

module.exports = Franchise;
