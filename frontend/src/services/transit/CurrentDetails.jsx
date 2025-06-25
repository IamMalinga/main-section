import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import NearMeSharpIcon from '@mui/icons-material/NearMeSharp';

const CurrentDetails = () => {
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [destinations, setDestinations] = useState(['Destination 1', 'Destination 2', 'Destination 3']); // Replace with your actual destinations

    useEffect(() => {
        // Get current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
            },
            (error) => {
                console.error("Error getting location: ", error);
                setLocation("Unable to retrieve location");
            }
        );

        // Get current time
        const updateTime = () => {
            const currentTime = new Date().toLocaleTimeString();
            setTime(currentTime);
        };
        updateTime();
        const timerId = setInterval(updateTime, 1000); // Update time every second

        return () => clearInterval(timerId); // Cleanup interval on component unmount
    }, []);

    return (
        <Box sx={{
            position: 'relative',
            height: 'auto',
            maxWidth: '600px',
            textAlign: 'left',
            padding: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
            overflow: 'hidden',
            margin: 'auto',
            zIndex: 1, // Ensure content is above other elements
            '&::before': { // Add a pseudo-element for background effect
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #e0e7ef, #ffffff)', // Modern gradient background
                zIndex: -1, // Ensure background is below content
                borderRadius: '12px'
            }
        }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} container alignItems="center">
                    <LocationOnSharpIcon sx={{ fontSize: '2em', color: '#3f51b5' }} />
                    <Typography sx={{ marginLeft: 1, fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>
                        Location
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: '1.2em', color: '#555' }}>
                        {location}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} container alignItems="center">
                    <AccessTimeSharpIcon sx={{ fontSize: '2em', color: '#f57c00' }} />
                    <Typography sx={{ marginLeft: 1, fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>
                        Time
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: '1.2em', color: '#555' }}>
                        {time}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} container alignItems="center">
                    <NearMeSharpIcon sx={{ fontSize: '2em', color: '#4caf50' }} />
                    <Typography sx={{ marginLeft: 1, fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>
                        Destinations
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} container direction="column">
                    {destinations.map((destination, index) => (
                        <Typography key={index} sx={{ fontSize: '1em', color: '#666' }}>
                            {destination}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CurrentDetails;
