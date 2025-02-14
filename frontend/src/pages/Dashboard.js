import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import { BugReport, CheckCircle, Warning, Report } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTheme } from "@mui/material/styles";

const COLORS = ["#4caf50", "#ff9800", "#f44336", "#2196f3"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const theme = useTheme(); // Access MUI theme

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch statistics");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Dashboard...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const chartData = [
    { name: "Complaints", value: stats.totalComplaints },
    { name: "Alerts", value: stats.totalAlerts },
    { name: "SOS", value: stats.totalSOSRequests },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { title: "Total Complaints", value: stats.totalComplaints, color: "#ffeb3b", icon: <BugReport fontSize="large" /> },
          { title: "Solved Complaints", value: stats.resolvedComplaints, color: "#4caf50", icon: <CheckCircle fontSize="large" /> },
          { title: "Location Alerts", value: stats.totalAlerts, color: "#ff9800", icon: <Warning fontSize="large" /> },
          { title: "SOS Requests", value: stats.totalSOSRequests, color: "#f44336", icon: <Report fontSize="large" /> },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#333" : stat.color,
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                textAlign: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                {stat.icon}
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                Total Issues applied 
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                  <YAxis tick={{ fontSize: 14 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="value" fill="#2196f3" barSize={50} radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                Pending of Issues
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
