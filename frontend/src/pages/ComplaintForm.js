import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";

const ComplaintForm = () => {
  const [form, setForm] = useState({ studentName: "", topic: "", description: "" });
  const [complaints, setComplaints] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/complaints", form);
      setSnackbar({ open: true, message: "Complaint submitted successfully", severity: "success" });
      setForm({ studentName: "", topic: "", description: "" });
      fetchComplaints(); // Refresh the complaint list
    } catch (error) {
      setSnackbar({ open: true, message: "Error submitting complaint", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          📢 Student Complaint Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Your Name" fullWidth margin="normal" name="studentName" value={form.studentName} onChange={handleChange} required />
          <TextField label="Complaint Topic" fullWidth margin="normal" name="topic" value={form.topic} onChange={handleChange} required />
          <TextField label="Describe your issue" fullWidth multiline rows={4} margin="normal" name="description" value={form.description} onChange={handleChange} required />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit Complaint
          </Button>
        </form>
      </Paper>

      {/* Complaint List */}
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>
          📝 Your Complaints
        </Typography>
        {complaints.length === 0 ? (
          <Typography>No complaints submitted yet.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Complaint Topic</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.topic}</TableCell>
                    <TableCell>{c.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      
      {/* Snackbar Notification */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ComplaintForm;
