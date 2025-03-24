import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Button,
  Typography,
} from "@mui/material";

const AdminEmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(
        "https://ecp-backend.onrender.com/api/emergency-alerts"
      );
      setAlerts(res.data);
    } catch (error) {
      console.error("Error fetching alerts", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecp-backend.onrender.com/api/emergency-alerts/${id}`);
      setAlerts(alerts.filter((alert) => alert._id !== id)); // Remove from UI
    } catch (error) {
      alert("Error deleting alert");
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.patch(`https://ecp-backend.onrender.com/api/emergency-alerts/${id}`, {
        status: "Resolved",
      });
      setAlerts(
        alerts.map((alert) =>
          alert._id === id ? { ...alert, status: "Resolved" } : alert
        )
      );
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        🚨 Location Alerts
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No Emergency Alerts
              </TableCell>
            </TableRow>
          ) : (
            alerts.map((alert) => (
              <TableRow key={alert._id}>
                <TableCell>{alert.studentName}</TableCell>
                <TableCell>{alert.location}</TableCell>
                <TableCell>
                  {new Date(alert.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell
                  style={{
                    color: alert.status === "Resolved" ? "green" : "red",
                  }}
                >
                  {alert.status}
                </TableCell>
                <TableCell>
                  {alert.status === "Pending" && (
                    <Button
                      color="primary"
                      onClick={() => handleResolve(alert._id)}
                    >
                      ✔ Resolve
                    </Button>
                  )}
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(alert._id)}
                  >
                    🗑 Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminEmergencyAlerts;
