const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const EmergencyAlert = require("../models/EmergencyAlert");
const SOSAlert = require("../models/SOSAlert");

router.get("/", async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });
    const totalAlerts = await EmergencyAlert.countDocuments();
    const totalSOSRequests = await SOSAlert.countDocuments();

    res.json({ totalComplaints, resolvedComplaints, totalAlerts, totalSOSRequests });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
