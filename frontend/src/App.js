import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComplaintForm from "./pages/ComplaintForm";
import AdminComplaints from "./pages/AdminComplaints";
import EmergencyAlert from "./pages/EmergencyAlert";
import AdminEmergencyAlerts from "./pages/AdminEmergencyAlerts";
import AdminNotice from "./pages/AdminNotice";
import StudentNotices from "./pages/StudentNotices";
import SOS from "./pages/SOS";
import AdminSOS from "./pages/AdminSOS";
import Contacts from "./pages/Contacts";
import GeoTracking from "./pages/GeoTracking";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FloatingChatBot from "./pages/FloatingChatBot";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/admin-complaints" element={<AdminComplaints />} />
        <Route path="/emergency-alert" element={<EmergencyAlert />} />
        <Route path="/admin-emergency-alerts" element={<AdminEmergencyAlerts />} />
        <Route path="/admin-notices" element={<AdminNotice />} />
        <Route path="/student-notices" element={<StudentNotices />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/anal" element={<Dashboard/>}/>
        <Route path="/login" element={<AuthPage/>}/>
        <Route path="/geo-tracking" element={<GeoTracking />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin-sos" element={<AdminSOS />} />
        <Route path="/chat" element={<FloatingChatBot />}/>
      </Routes>
    </Router>
  );
};

export default App;
