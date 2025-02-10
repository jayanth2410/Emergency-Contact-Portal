const express = require("express");
const router = express.Router();
const EmergencyContact = require("../models/EmergencyContact");

// Add a new emergency contact
router.post("/", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const newContact = new EmergencyContact({ name, phone, email });
    await newContact.save();
    res.status(201).json({ message: "Emergency contact added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding contact" });
  }
});

// Get all emergency contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await EmergencyContact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contacts" });
  }
});

// Delete an emergency contact
router.delete("/:id", async (req, res) => {
  try {
    await EmergencyContact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
});

module.exports = router;
