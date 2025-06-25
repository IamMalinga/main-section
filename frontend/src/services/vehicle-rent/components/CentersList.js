import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    Box,
    Grid,
    Pagination
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import CurrentDetails from './CurrentDetails'; // Adjust the import path as needed

const rentalCenters = [
    {
        id: 1,
        name: "ABC Car Rentals",
        type: "Car",
        openTime: "8:00 AM",
        closeTime: "6:00 PM",
        phone: "+94 123 456 789",
        position: { lat: 6.9271, lng: 79.8612 },
        status: "Close",
        imageUrl: './images/car-rental.jpg'
    },
    {
        id: 2,
        name: "XYZ Bike Rentals",
        type: "Bike",
        openTime: "9:00 AM",
        closeTime: "5:00 PM",
        phone: "+94 987 654 321",
        position: { lat: 7.2906, lng: 80.6337 },
        status: "Open",
        imageUrl: './images/car-rental.jpg'
    },
    // Add more rental centers as needed
];

const mapStyles = {
    height: "200px",
    width: "100%"
};

const apiKey = 'AIzaSyDqzGYxZDTRhnYtjZBxRJpFAWHIGh9xcY4';  // Replace with your Google Maps API key

const CentersList = ({ filters, onCenterClick }) => {
    const [places, setPlaces] = useState({});

    useEffect(() => {
        rentalCenters.forEach(center => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.position.lat},${center.position.lng}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results[0]) {
                        setPlaces(prevPlaces => ({
                            ...prevPlaces,
                            [center.id]: data.results[0].formatted_address
                        }));
                    }
                });
        });
    }, []);

    const filteredCenters = rentalCenters.filter(center => {
        return (
            (!filters.carType || center.type === filters.carType) &&
            (!filters.centerName || center.name.toLowerCase().includes(filters.centerName.toLowerCase())) &&
            (!filters.location || center.position.lat.toString().includes(filters.location) || center.position.lng.toString().includes(filters.location))
        );
    });

    return (
        <Box sx={{ maxWidth: 1200, margin: '0', padding: 3, fontFamily: 'Poppins, sans-serif' }}>
            <CurrentDetails
                profilePicture="./images/profile.jpg"  // Replace with the actual path to the profile picture
                destinations={['Destination 1', 'Destination 2']}  // Replace with actual destinations
            />
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
                Vehicle Rental Centers
            </Typography>
            {filteredCenters.map((center) => (
                <Card key={center.id} sx={{ marginBottom: 3, boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <CardMedia
                                component="img"
                                image={center.imageUrl}
                                alt={center.name}
                                sx={{ height: '100%', objectFit: 'cover' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {center.name}
                                </Typography>
                                <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                    {center.type === "Car" ? <DirectionsCarIcon sx={{ marginRight: 0.5 }} /> : <DirectionsBikeIcon sx={{ marginRight: 0.5 }} />}
                                    {center.type} Rental
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                    <AccessTimeIcon sx={{ marginRight: 0.5 }} /> {center.openTime} - {center.closeTime}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                    <PhoneIcon sx={{ marginRight: 0.5 }} /> {center.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    Location: {places[center.id] || 'Loading...'}
                                </Typography>
                                <LoadScript googleMapsApiKey={apiKey}>
                                    <GoogleMap
                                        mapContainerStyle={mapStyles}
                                        zoom={14}
                                        center={center.position}
                                    >
                                        <Marker position={center.position} />
                                    </GoogleMap>
                                </LoadScript>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small" onClick={() => onCenterClick(center)}>
                                    View Center
                                </Button>
                            </CardActions>
                        </Grid>

                    </Grid>
                </Card>
            ))}
            <Pagination count={10} color="primary" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}/>
        </Box>
    );
};

export default CentersList;
