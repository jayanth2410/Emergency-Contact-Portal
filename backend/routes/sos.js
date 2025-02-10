const express = require("express");
const router = express.Router();
const SOSAlert = require("../models/SOSAlert");
const twilio = require("twilio");
require("dotenv").config();

// Twilio setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Student sends SOS alert
router.post("/", async (req, res) => {
  try {
    const { studentName } = req.body;
    const newAlert = new SOSAlert({ studentName, status: "Pending" });
    await newAlert.save();

    await client.messages.create({
      body: `🚨 SOS Alert! ${studentName} is in danger!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.ADMIN_PHONE_NUMBER,
    });

    res.status(201).json({ message: "SOS alert sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending SOS alert" });
  }
});

// Admin fetches all SOS alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await SOSAlert.find().sort({ time: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching SOS alerts" });
  }
});

// Admin updates SOS status
router.put("/:id", async (req, res) => {
  try {
    await SOSAlert.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "SOS status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating SOS status" });
  }
});

// Admin deletes SOS alert
router.delete("/:id", async (req, res) => {
  try {
    await SOSAlert.findByIdAndDelete(req.params.id);
    res.json({ message: "SOS alert deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting SOS alert" });
  }
});

module.exports = router;
