const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Resolved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
