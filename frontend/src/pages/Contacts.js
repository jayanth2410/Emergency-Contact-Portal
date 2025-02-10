import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Typography, Container, Box, TextField, Button, List, ListItem, 
  ListItemText, IconButton, Snackbar, Alert 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import SmsIcon from "@mui/icons-material/Sms";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/emergency-contacts");
        setContacts(res.data);
      } catch (error) {
        console.error("Error fetching contacts", error);
      }
    };
    fetchContacts();
  }, []);

  // Add a new contact
  const handleAddContact = async () => {
    if (!name || !phone) {
      alert("Please enter Name and Phone!");
      return;
    }

    try {
      const newContact = { name, phone, email };
      await axios.post("http://localhost:5000/api/emergency-contacts", newContact);
      setContacts([...contacts, newContact]);
      setName("");
      setPhone("");
      setEmail("");
      setOpenSnackbar(true);
    } catch (error) {
      alert("Error adding contact");
    }
  };

  // Delete a contact
  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/emergency-contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      alert("Error deleting contact");
    }
  };

  // Make a call
  const handleCallContact = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  // Send an emergency SMS
  const handleSendSms = (phone) => {
    const message = encodeURIComponent("🚨 EMERGENCY: I need urgent help! Please contact me ASAP.");
    window.location.href = `sms:${phone}?body=${message}`;
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom color="primary">
          📞 Emergency Contacts
        </Typography>
        
        {/* Input Fields */}
        <Box mb={3}>
          <TextField fullWidth margin="normal" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Email (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleAddContact} fullWidth>
            ➕ Add Contact
          </Button>
        </Box>

        {/* Contact List */}
        <Typography variant="h6" gutterBottom>📋 Your Contacts</Typography>
        <List sx={{ bgcolor: "#f9f9f9", borderRadius: 2, p: 2 }}>
          {contacts.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No contacts added.</Typography>
          ) : (
            contacts.map((contact, index) => (
              <ListItem key={contact._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#fff", mb: 1, p: 2, borderRadius: 2 }}>
                <ListItemText 
                  primary={contact.name} 
                  secondary={`📞 ${contact.phone} | ✉️ ${contact.email || "N/A"}`} 
                />
                <Box>
                  <IconButton color="success" onClick={() => handleCallContact(contact.phone)}>
                    <PhoneIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleSendSms(contact.phone)}>
                    <SmsIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteContact(contact._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Contact added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contacts;
