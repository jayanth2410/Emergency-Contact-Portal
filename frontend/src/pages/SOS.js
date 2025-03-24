import React, { useState, useEffect } from "react";
import axios from "axios";
import sirenSound from "./siren.mp3"; // Ensure siren.mp3 is in the correct folder

import { Button, TextField, CircularProgress, Typography, Container, Paper, List, ListItem, ListItemText } from "@mui/material";
import { Alert as MuiAlert } from "@mui/material"; // For better alert messages

const SOS = () => {
  const [studentName, setStudentName] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("https://ecp-backend.onrender.com/api/sos");
      setAlerts(res.data);
    } catch (error) {
      console.error("Error fetching SOS alerts", error);
    }
  };

  const sendSOS = async () => {
    if (!studentName) {
      alert("Please enter your name!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://ecp-backend.onrender.com/api/sos", { studentName });
      alert("🚨 SOS alert sent successfully!");
      fetchAlerts();

      // Start countdown and disable button
      setDisabled(true);
      setCountdown(30);
      playSiren();

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setDisabled(false);
            setLoading(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert("Error sending SOS alert");
      setLoading(false);
    }
  };

  const playSiren = () => {
    const audio = new Audio(sirenSound);
    audio.play();
  };

  return (
    <Container maxWidth="sm" style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" color="error" gutterBottom style={{ fontWeight: "bold", marginBottom: "20px" }}>
        🚨 SOS Emergency Alert
      </Typography>

      <TextField
        label="Name & Detail"
        variant="outlined"
        fullWidth
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <Button
        onClick={sendSOS}
        disabled={disabled || loading}
        variant="contained"
        color="error"
        fullWidth
        size="large"
        style={{ padding: "12px", fontSize: "18px", marginBottom: "20px" }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : `🚨 Send SOS Alert ${disabled && `(${countdown}s)`}`}
      </Button>

      <Typography variant="h6" gutterBottom style={{ fontWeight: "bold", marginTop: "20px" }}>
        📜 Your SOS Alerts
      </Typography>

      {alerts.length === 0 ? (
        <Typography variant="body1" style={{ color: "gray" }}>
          No SOS alerts submitted yet.
        </Typography>
      ) : (
        <Paper elevation={3} style={{ padding: "10px", marginTop: "10px" }}>
          <List>
            {alerts.map((alert, index) => (
              <ListItem key={index} style={{ borderBottom: "1px solid #eee" }}>
                <ListItemText
                  primary={<strong>{alert.studentName}</strong>}
                  secondary={`${new Date(alert.time).toLocaleString()} - Status: ${alert.status || "Pending"}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default SOS;
