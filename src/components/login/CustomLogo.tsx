import React from "react";
import { Typography, Box } from "@mui/material";
import { DeliveryDining } from "@mui/icons-material";

const CustomLogo = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" my={2}>
      {/* <img src="/path-to-your-logo/logo.png" alt="Custom Logo" width={150} /> */}
      <DeliveryDining />
      <Typography variant="h5" component="div" ml={2}>
       Ridersz
      </Typography>
    </Box>
  );
};

export default CustomLogo;
