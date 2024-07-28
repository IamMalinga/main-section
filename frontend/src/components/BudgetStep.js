import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const BudgetStep = ({ tripData, updateTripData }) => {
  return (
    <Box p={2}>
      <Typography variant="h5">Budget</Typography>
      <TextField
        label="Budget"
        value={tripData.budget}
        onChange={(e) => updateTripData({ budget: e.target.value })}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default BudgetStep;
