const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// Admin posts a notice
router.post("/", async (req, res) => {
  try {
    const { topic, description, expiresAt } = req.body;

    // Validate expiration date
    if (new Date(expiresAt) < new Date()) {
      return res.status(400).json({ error: "Expiration date must be in the future" });
    }

    const newNotice = new Notice({ topic, description, expiresAt });
    await newNotice.save();
    res.status(201).json({ message: "Notice posted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all active notices (Student View)
router.get("/", async (req, res) => {
  try {
    const currentDate = new Date();
    const notices = await Notice.find({ expiresAt: { $gte: currentDate } }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
  