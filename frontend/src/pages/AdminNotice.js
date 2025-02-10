import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, List, ListItem, ListItemText, IconButton, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminNotice = () => {
  const [form, setForm] = useState({ topic: "", description: "", expiresAt: "" });
  const [notices, setNotices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notices");
      setNotices(res.data);
    } catch (error) {
      console.error("Error fetching notices", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/notices", form);
      setSnackbarMessage("Notice posted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setForm({ topic: "", description: "", expiresAt: "" });
      fetchNotices(); // Refresh list
    } catch (error) {
      setSnackbarMessage("Error posting notice");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`);
      setNotices(notices.filter((notice) => notice._id !== id)); // Remove deleted notice from state
      setSnackbarMessage("Notice deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error deleting notice");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>📢 Admin Notice Board</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Notice Topic"
          name="topic"
          value={form.topic}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Notice Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          label="Expiration Date"
          type="datetime-local"
          name="expiresAt"
          value={form.expiresAt}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Post Notice
        </Button>
      </form>

      <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>📜 Existing Notices</Typography>
      <List>
        {notices.map((notice) => (
          <ListItem key={notice._id} style={{ backgroundColor: "#f5f5f5", marginBottom: "10px", borderRadius: "5px" }}>
            <ListItemText
              primary={notice.topic}
              secondary={`Expires at: ${new Date(notice.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}
            />
            <IconButton onClick={() => handleDelete(notice._id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminNotice;