import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert } from "@mui/material";

const AdminComplaints = () => {
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
      setSnackbar({ open: true, message: "Error fetching complaints", severity: "error" });
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/status`, { status });
      setSnackbar({ open: true, message: `Complaint marked as ${status}`, severity: "success" });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status", error);
      setSnackbar({ open: true, message: "Error updating status", severity: "error" });
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      setSnackbar({ open: true, message: "Complaint deleted successfully", severity: "success" });
      fetchComplaints();
    } catch (error) {
      console.error("Error deleting complaint", error);
      setSnackbar({ open: true, message: "Error deleting complaint", severity: "error" });
    }
  };

  return (
    <TableContainer component={Paper}>
      <h2 style={{ padding: "20px" }}>📌Admin Complaints</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Student Name</b></TableCell>
            <TableCell><b>Complaint Topic</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Submitted On</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints.map((c) => (
            <TableRow key={c._id}>
              <TableCell>{c.studentName}</TableCell>
              <TableCell>{c.topic}</TableCell>
              <TableCell>{c.description}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>{new Date(c.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button color="success" onClick={() => updateStatus(c._id, "Resolved")} style={{ marginRight: 5 }}>
                  ✅ Resolve
                </Button>
                <Button color="warning" onClick={() => updateStatus(c._id, "Rejected")} style={{ marginRight: 5 }}>
                  ❌ Reject
                </Button>
                <Button color="error" onClick={() => deleteComplaint(c._id)}>
                  🗑️ Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default AdminComplaints;
