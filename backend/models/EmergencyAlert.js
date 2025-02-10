const mongoose = require("mongoose");

const EmergencyAlertSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  location: { type: String, required: true, enum: ["A Block", "IB Block", "C Gate", "Gym"] },
  status: { type: String, default: "Pending", enum: ["Pending", "Resolved"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmergencyAlert", EmergencyAlertSchema);
