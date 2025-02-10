const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Import complaint routes
const complaintRoutes = require("./routes/complaints");
app.use("/api/complaints", complaintRoutes);

//import emergency-alerts routes
const emergencyAlertRoutes = require("./routes/emergencyAlerts");
app.use("/api/emergency-alerts", emergencyAlertRoutes);

//import notices routes
const noticeRoutes = require("./routes/notices");
app.use("/api/notices", noticeRoutes);

//import sos routes
const sosRoutes = require("./routes/sos");
app.use("/api/sos", sosRoutes);

//import  contact routes
const emergencyContactRoutes = require("./routes/emergencyContacts");
app.use("/api/emergency-contacts", emergencyContactRoutes);

//import location routes
const locationRoutes = require("./routes/location");
app.use("/api/locations", locationRoutes);

const nearbyRoutes = require("./routes/nearby");
app.use("/api/nearby", nearbyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
