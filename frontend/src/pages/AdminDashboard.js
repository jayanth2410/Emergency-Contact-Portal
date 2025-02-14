import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
} from "@mui/icons-material";
import axios from "axios";
import AdminComplaint from "./AdminComplaints";
import AdminEmergencyAlert from "./AdminEmergencyAlerts";
import AdminNotice from "./AdminNotice";
import AdminSOS from "./AdminSOS";
import Dashboard from "./Dashboard";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  transition: "transform 0.2s, box-shadow 0.3s",
  background: theme.palette.background.paper,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
  },
}));

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolvedComplaints: 0,
    locationAlerts: 0,
    sosRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(to right,rgb(232, 250, 255),rgb(170, 223, 235))",
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#1e3c72" }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            🛠️ Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ mt: 5 }}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 12, px: isMobile ? 2 : 4 }}>
        <Grid container spacing={3}>
          {/* {[{ title: "Total Complaints", value: stats.totalComplaints, color: "#ff4b5c" },
            { title: "Resolved Complaints", value: stats.resolvedComplaints, color: "#4caf50" },
            { title: "Location Alerts", value: stats.locationAlerts, color: "#ff9800" },
            { title: "SOS Requests", value: stats.sosRequests, color: "#3f51b5" }].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledPaper elevation={3} sx={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </StyledPaper>
            </Grid>
          ))} */}
          <Grid item xs={12}>
            <StyledPaper elevation={3}><Dashboard /></StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper elevation={3}><AdminSOS /></StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper elevation={3}><AdminComplaint /></StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}><AdminEmergencyAlert /></StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}><AdminNotice /></StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
