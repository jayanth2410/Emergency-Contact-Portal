const express = require("express");
const router = express.Router();
const EmergencyAlert = require("../models/EmergencyAlert");

// Submit an emergency alert
router.post("/", async (req, res) => {
  try {
    const { studentName, location } = req.body;
    if (!studentName || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newAlert = new EmergencyAlert({ studentName, location });
    await newAlert.save();
    res.status(201).json({ message: "Emergency alert submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all emergency alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete an alert (Admin use)
router.delete("/:id", async (req, res) => {
  try {
    await EmergencyAlert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update alert status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedAlert = await EmergencyAlert.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedAlert);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
