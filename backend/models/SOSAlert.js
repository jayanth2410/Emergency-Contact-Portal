const mongoose = require("mongoose");

const SOSAlertSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  time: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" }, // New status field
});

module.exports = mongoose.model("SOSAlert", SOSAlertSchema);
