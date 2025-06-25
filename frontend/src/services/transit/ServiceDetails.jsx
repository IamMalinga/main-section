import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import InfoSharpIcon from '@mui/icons-material/InfoSharp'; // Example icon; replace with a relevant one

const ServiceDetails = () => {
    // Replace these values with actual service details
    const serviceName = "Example Service";
    const version = "1.0.0";
    const lastUpdate = "2024-08-04";

    return (
        <Box sx={{
            height: '28vh', // Adjust height to fit content dynamically
            maxWidth: '500px', // Set a max width for better responsiveness
            textAlign: 'center',
            padding: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f0f4f8, #e0e7ef)',
            overflow: 'hidden', // Hide overflow to keep design clean
            margin: 'auto', // Center horizontally
            position: 'relative' // Ensure it stays in the intended position
        }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <InfoSharpIcon sx={{ fontSize: '2.5em', color: '#3f51b5' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                        {serviceName}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: '5px' }}>
                        Version: {version}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#777' }}>
                        Last Update: {lastUpdate}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ServiceDetails;
