import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Typography, Container, CircularProgress } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

const GeoTracking = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get User Location
  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching location", error);
          setLoading(false);
          alert("Failed to get location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  // Send WhatsApp Alert
  const sendWhatsAppAlert = () => {
    if (!location) {
      alert("Please get the location first!");
      return;
    }
    const message = encodeURIComponent(
      `🚨 EMERGENCY: I am in danger, please help! My live location: https://www.google.com/maps?q=${location.lat},${location.lng}`
    );
    window.open(`https://wa.me/8754124935?text=${message}`, "_blank");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" color="error" gutterBottom style={{ fontWeight: "bold", marginBottom: "20px" }}>
                🚨 Emergency Geolocation
              </Typography>
        {/* Geo Emergency Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetLocation}
          fullWidth
          disabled={loading}
          startIcon={<LocationOnIcon />}
          sx={{ mb: 3, py: 1.5, fontSize: "1.1rem" }}
        >
          {loading ? <CircularProgress size={24} /> : "Get My Location"}
        </Button>

        {/* Display Map if Location is Available */}
        {location && (
          <Box mt={3}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Your current location:
            </Typography>
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              style={{ height: "300px", width: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[location.lat, location.lng]}
                icon={L.icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
              >
                <Popup>🚨 Emergency Location</Popup>
              </Marker>
            </MapContainer>
          </Box>
        )}

        {/* Send WhatsApp Message */}
        {location && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="success"
              onClick={sendWhatsAppAlert}
              startIcon={<WhatsAppIcon />}
              fullWidth
              sx={{ py: 1.5, fontSize: "1.1rem" }}
            >
              Send WhatsApp Alert
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GeoTracking;