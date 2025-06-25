import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Grid, CircularProgress, Paper, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const CurrentDetails = ({ profilePicture, destinations }) => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDqzGYxZDTRhnYtjZBxRJpFAWHIGh9xcY4', // Replace with your API key
        libraries: ['places'],
    });

    useEffect(() => {
        if (!isLoaded) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });

                    // Access Geocoder from window.google.maps
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            setAddress(results[0].formatted_address);
                        } else {
                            setAddress('Unable to retrieve address');
                        }
                        setLoading(false);
                    });
                },
                () => {
                    setError('Unable to retrieve your location.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, [isLoaded]);

    if (!isLoaded) return <CircularProgress />;

    return (
        <Paper sx={{ padding: 3, boxShadow: 3, marginBottom: 2, borderRadius: 2, backgroundColor: '#f5f5f5', fontFamily: 'Poppins, sans-serif' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar
                        alt="Profile Picture"
                        src={profilePicture}
                        sx={{ width: 80, height: 80, border: '2px solid #1976d2' }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Current Details
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : error ? (
                        <Typography variant="body1" sx={{ color: 'red' }}>
                            {error}
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#555' }}>
                                <LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: 0.5 }} />
                                {address || `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#333', marginTop: 1 }}>
                                Destinations: {destinations.join(', ')}
                            </Typography>
                        </>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CurrentDetails;
