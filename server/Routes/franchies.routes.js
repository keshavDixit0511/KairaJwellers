const express = require('express');
const franchiesModel = require('../model/franchies.model');
const router = express.Router();

// POST route to create a new franchise entry
router.post('/franchise', async (req, res) => {
  try {
    // If FormData is sent from the frontend, use multer or a similar middleware to parse it.
    // For now, assuming you are using a middleware that parses FormData and attaches fields to req.body

    // Directly use req.body as the data object, since all values are coming in FormData
    const franchies = await franchiesModel.create(req.body);

    res.status(201).json({
      message: "Franchise form data is stored in db",
      franchies
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// GET route to fetch all franchise entries
router.get('/franchise', async (req, res) => {
  try {
    const franchies = await franchiesModel.find();

    if (!franchies || franchies.length === 0) {
      return res.status(404).json({
        message: "No form submissions found"
      });
    }

    res.status(200).json({
      message: "Data fetched successfully",
      franchies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
