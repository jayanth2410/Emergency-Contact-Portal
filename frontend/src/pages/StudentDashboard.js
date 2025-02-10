import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Container,
  Grid,
  Paper,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  List,
  ListItem,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Notifications,
  Menu as MenuIcon,
  Home,
  Assignment,
  Phone,
  School,
  LocationOn,
  ExitToApp,
  Settings,
  Person,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import GeoTracking from "./GeoTracking";
import SOSAlert from "./SOS";
import NoticeBoard from "./StudentNotices";
// import Footer from "./Footer";
import FloatingChatBot from "./FloatingChatBot"; // Import the FloatingChatBot component

const StudentDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [bottomNav, setBottomNav] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (open) => () => {
    setMenuOpen(open);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right,rgb(232, 250, 255),rgb(170, 223, 235))",
        minHeight: "100vh",
        color: "white",
        pb: 10,
      }}
    >
      {!isMobile ? (
        <AppBar position="static" sx={{ backgroundColor: "#676767" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              🎓 Student Dashboard
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/" sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }}>
                <Home sx={{ mr: 1 }} /> Home
              </Button>
              <Button color="inherit" component={Link} to="/complaint" sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }}>
                <Assignment sx={{ mr: 1 }} /> Complaint
              </Button>
              <Button color="inherit" component={Link} to="/contacts" sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }}>
                <Phone sx={{ mr: 1 }} /> Contact
              </Button>
              <Button color="inherit" component={Link} to="/emergency-alert" sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }}>
                <LocationOn sx={{ mr: 1 }} /> Alert
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton color="inherit" component={Link} to="/student-notices">
                <Notifications />
              </IconButton>
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="S" src="/profile.jpg" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <BottomNavigation
          value={bottomNav}
          onChange={(event, newValue) => setBottomNav(newValue)}
          showLabels
          sx={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#1976d2" }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/" />
          <BottomNavigationAction label="Complaint" icon={<Assignment />} component={Link} to="/complaint" />
          <BottomNavigationAction label="Contact" icon={<Phone />} component={Link} to="/contacts" />
          <BottomNavigationAction label="Alert" icon={<LocationOn />} component={Link} to="/emergency-alert" />
        </BottomNavigation>
      )}

      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <Typography variant="h6" fontWeight="bold">📌 Menu</Typography>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/">
            <Home sx={{ mr: 1 }} /> Home
          </ListItem>
          <ListItem button component={Link} to="/complaint">
            <Assignment sx={{ mr: 1 }} /> Complaint
          </ListItem>
          <ListItem button component={Link} to="/contacts">
            <Phone sx={{ mr: 1 }} /> Contact
          </ListItem>
          <ListItem button component={Link} to="/emergency-alert">
            <LocationOn sx={{ mr: 1 }} /> Alert
          </ListItem>
        </List>
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <Typography variant="h6" fontWeight="bold">
                <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} /> Geo Tracking
              </Typography>
              <GeoTracking />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <Typography variant="h6" fontWeight="bold">🚨 SOS Alert</Typography>
              <SOSAlert />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <Typography variant="h6" fontWeight="bold">📜 Notice Board</Typography>
              <NoticeBoard />
            </Paper>
          </Grid>

          <Grid item xs={12} md={60}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                🔗 Quick Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to="/complaint"
                    startIcon={<Assignment />}
                  >
                    File Complaint
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to="/contacts"
                    startIcon={<School />}
                  >
                    Contact Faculty
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* <Footer /> */}
      <FloatingChatBot />
    </Box>
  );
};

export default StudentDashboard;
