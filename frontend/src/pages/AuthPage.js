import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";

const AuthPage = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const ADMIN_SECRET = "Admin@123";

  const handleSubmit = () => {
    if (role === "admin") {
      if (adminPassword === ADMIN_SECRET) {
        alert("Admin Login Successful");
        navigate("/admin"); // Redirect to admin page
      } else {
        alert("Invalid Admin Password");
      }
    } else {
      if (isRegister) {
        alert(`Student Registered: ${name}, ${email}`);
      } else {
        alert(`Student Login Successful: ${email}`);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" align="center">
          {role === "admin" ? "Admin Login" : isRegister ? "Student Registration" : "Student Login"}
        </Typography>

        {role !== "admin" && isRegister && (
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {role === "admin" ? (
          <TextField
            label="Admin Password"
            fullWidth
            margin="normal"
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        ) : (
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          {role === "admin" ? "Login as Admin" : isRegister ? "Register" : "Login"}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          {role !== "admin" && (
            <Typography
              sx={{ cursor: "pointer", color: "blue" }}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Login" : "New user? Register"}
            </Typography>
          )}
          <Typography
            sx={{ cursor: "pointer", color: "red", mt: 1 }}
            onClick={() => setRole(role === "admin" ? "student" : "admin")}
          >
            {role === "admin" ? "Switch to Student Login" : "Login as Admin"}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
