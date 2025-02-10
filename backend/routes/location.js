const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// Save Live Location
router.post("/", async (req, res) => {
  try {
    const { studentName, latitude, longitude } = req.body;
    const newLocation = new Location({ studentName, latitude, longitude });
    await newLocation.save();
    res.status(201).json({ message: "Live location saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving location" });
  }
});

// Get Latest Locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().sort({ timestamp: -1 }).limit(5);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching locations" });
  }
});

module.exports = router;
