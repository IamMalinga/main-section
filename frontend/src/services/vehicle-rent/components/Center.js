import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Center = ({ center }) => {
    if (!center) return null;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
                {center.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Type: {center.type}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Opening Hours: {center.openTime} - {center.closeTime}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Contact: {center.phone}
            </Typography>
            <Button variant="contained" color="primary">
                Book Now
            </Button>
        </Box>
    );
};

export default Center;
