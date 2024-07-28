import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const DaysStep = ({ tripData, updateTripData }) => {
  return (
    <Box p={2}>
      <Typography variant="h5">Number of Days</Typography>
      <TextField
        label="Days"
        value={tripData.days}
        onChange={(e) => updateTripData({ days: e.target.value })}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default DaysStep;
