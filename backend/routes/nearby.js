const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lng, type } = req.query;
    if (!lat || !lng || !type) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY; // Ensure this key is set in .env
    const radius = 5000; // 5 km radius

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Error fetching locations" });
  }
});

module.exports = router;
