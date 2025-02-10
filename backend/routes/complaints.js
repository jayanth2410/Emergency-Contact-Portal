const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// Submit a complaint
router.post("/", async (req, res) => {
  try {
    const { studentName, topic, description } = req.body;
    const newComplaint = new Complaint({ studentName, topic, description });
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all complaints (Admin View)
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update Complaint Status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    await Complaint.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Complaint status updated" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Complaint
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
