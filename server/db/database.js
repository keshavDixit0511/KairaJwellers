const path = require('path');
// This line tells dotenv to look for .env.local specifically
require('dotenv').config({ path: '.env.local' }); 

const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  // Debug: This should now show your connection string
  console.log("Attempting to connect to MongoDB with URI:", uri);

  if (!uri) {
    console.error("❌ Error: MONGODB_URI is undefined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected with Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;