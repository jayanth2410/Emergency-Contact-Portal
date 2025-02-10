const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }, // Expiration date added
});

module.exports = mongoose.model("Notice", NoticeSchema);
