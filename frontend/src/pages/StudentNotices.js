import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Snackbar,
  Alert,
  TextField,
  CircularProgress,
  Button,
  Grid
} from "@mui/material";
import { Search } from "@mui/icons-material";

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("https://ecp-backend.onrender.com/api/notices");
        const currentTime = new Date();
        
        // Remove expired notices
        const activeNotices = res.data.filter(notice => new Date(notice.expiresAt) > currentTime);

        setNotices(activeNotices);
        setFilteredNotices(activeNotices);
      } catch (error) {
        console.error("Error fetching notices", error);
        setSnackbarMessage("Error fetching notices");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  // Search Filter
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredNotices(
      notices.filter(notice =>
        notice.topic.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query)
      )
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📢 Important Notices
      </Typography>

      {/* Search Input */}
      <TextField
        variant="outlined"
        placeholder="Search notices..."
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{ startAdornment: <Search color="action" sx={{ mr: 1 }} /> }}
        sx={{ mb: 3, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
      />

      {loading ? (
        <CircularProgress />
      ) : filteredNotices.length === 0 ? (
        <Typography color="textSecondary">
          No active notices available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredNotices.map((notice) => (
            <Grid item xs={12} sm={6} key={notice._id}>
              <Card sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {notice.topic}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                    {notice.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    🕒 Published: {new Date(notice.createdAt).toLocaleString()} <br />
                    ⏳ Expires: {new Date(notice.expiresAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar for Errors */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentNotices;
