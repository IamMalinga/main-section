import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const services = [
  'Start Trip Now',
  'Vehicle Service Center',
  'Vehicle Hire Centers',
  'Special Event Reminder',
  'Restaurants',
  'Hotel Booking',
  'Weather Details'
];

const ServicesStep = () => {
  return (
    <Box p={2}>
      <Typography variant="h5">Services</Typography>
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
              {service}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesStep;
