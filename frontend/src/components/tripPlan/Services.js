import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const services = [
    'Start Trip Now',
    'Vehicle Service Center',
    'Vehicle Hire Centers',
    'Special Event Reminder',
    'Restaurants',
    'Hotel Booking',
    'Weather Details'
];

const Services = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollToBottom) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [location]);

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

export default Services;
