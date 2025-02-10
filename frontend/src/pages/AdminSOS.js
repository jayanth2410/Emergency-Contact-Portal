import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const AdminSOS = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sos");
      setAlerts(res.data);
    } catch (error) {
      console.error("Error fetching SOS alerts", error);
    }
  };

  const resolveAlert = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/sos/${id}`, { status: "Resolved" });
      fetchAlerts();
    } catch (error) {
      console.error("Error updating SOS status", error);
    }
  };

  const deleteAlert = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sos/${id}`);
      fetchAlerts();
    } catch (error) {
      console.error("Error deleting SOS alert", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 Admin SOS Alerts</h2>
      {alerts.length === 0 ? (
        <p>No SOS alerts received</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Student Name</b></TableCell>
                <TableCell><b>Submitted On</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert._id}>
                  <TableCell>{alert.studentName}</TableCell>
                  <TableCell>{new Date(alert.time).toLocaleString()}</TableCell>
                  <TableCell>{alert.status || "Pending"}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" onClick={() => resolveAlert(alert._id)} disabled={alert.status === "Resolved"}>
                      Resolve
                    </Button>
                    <Button variant="contained" color="error" onClick={() => deleteAlert(alert._id)} style={{ marginLeft: "10px" }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminSOS;
