import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, MenuItem, Button, Typography } from "@mui/material";

const EmergencyAlert = () => {
  const [form, setForm] = useState({ studentName: "", location: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ecp-backend.onrender.com/api/emergency-alerts", form);
      alert("🚨 Emergency alert submitted successfully!");
      setForm({ studentName: "", location: "" });
    } catch (error) {
      alert("Error submitting alert");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>🚨 Emergency Alert(Nearby)</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Name"
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
        <TextField
          select
          label="Select Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="A Block">A Block</MenuItem>
          <MenuItem value="IB Block">IB Block</MenuItem>
          <MenuItem value="C Gate">C Gate</MenuItem>
          <MenuItem value="Gym">Gym</MenuItem>
        </TextField>
        
        <Button variant="contained" color="primary" fullWidth type="submit">
          Submit Alert 🚨
        </Button>
      </form>
    </Container>
  );
};

export default EmergencyAlert;
