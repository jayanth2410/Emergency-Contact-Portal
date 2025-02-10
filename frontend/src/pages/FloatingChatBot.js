import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Box, Paper, TextField, Button, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }, []);

  const handleToggleChat = () => {
    setOpen(!open);
  };

  // ✅ Replacing API call with hardcoded dummy locations
  const fetchEmergencyLocations = async (type) => {
    const dummyData = {
      hospital: [{ name: "Medical Hospital", vicinity: "1.2KM" }],
      police: [{ name: "Sathy Police Station", vicinity: "Eswarn Kovil" }],
      security: [{ name: "Campus Security", vicinity: "Main Gate" }],
    };

    return dummyData[type] || [];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    const emergencyKeywords = ["help", "hi", "hello", "emergency", "support"];
    if (emergencyKeywords.some((word) => input.toLowerCase().includes(word))) {
      const hospitals = await fetchEmergencyLocations("hospital");
      const policeStations = await fetchEmergencyLocations("police");
      const security = await fetchEmergencyLocations("security");

      let emergencyResponse = "🚑 Nearby Emergency Locations:\n";
      if (hospitals.length) emergencyResponse += `🏥 ${hospitals[0].name}, 📍 ${hospitals[0].vicinity}\n`;
      if (policeStations.length) emergencyResponse += `🚔 ${policeStations[0].name}, 📍 ${policeStations[0].vicinity}\n`;
      if (security.length) emergencyResponse += `🛡️ ${security[0].name}, 📍 ${security[0].vicinity}\n`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: emergencyResponse, sender: "bot" },
      ]);
      return;
    }

    setTimeout(() => {
      const botResponse = {
        text: "Emergency support is on the way! If you need immediate help, call 199 or your college security.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <Tooltip title="24/7 Emergency Help">
        <IconButton
          onClick={handleToggleChat}
          color="primary"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
            width: 56,
            height: 56,
          }}
        >
          {open ? <CloseIcon /> : <SmartToyIcon />}
        </IconButton>
      </Tooltip>

      {open && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: 70,
            right: 0,
            width: 320,
            maxHeight: 400,
            display: "flex",
            flexDirection: "column",
            p: 2,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
            🚨 24/7 Emergency Chat(BIT)
          </Typography>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: 300,
              p: 1,
              borderBottom: "1px solid #ddd",
            }}
          >
            {messages.length === 0 ? (
              <Typography variant="body2" sx={{ textAlign: "center", color: "#999" }}>
                How can I assist you?
              </Typography>
            ) : (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: msg.sender === "user" ? "#1976d2" : "#ddd",
                      color: msg.sender === "user" ? "white" : "black",
                      maxWidth: "80%",
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              ))
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FloatingChatBot;
