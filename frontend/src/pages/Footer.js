import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1976d2", color: "white", textAlign: "center", p: 2, mt: 4 }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Student Safety Portal | All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
