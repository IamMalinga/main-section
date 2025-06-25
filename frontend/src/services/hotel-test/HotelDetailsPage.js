import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Rating, Paper, CircularProgress } from '@mui/material';

const HotelDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/hotels/find/${id}`)  // Use backticks for template literals
            .then(res => {
                setHotel(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching hotel:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

    if (!hotel) return <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>Hotel not found.</Typography>;

    const handleBooking = () => {
        navigate(`/services/book-hotel/${hotel._id}, { state: { hotel } }`); // Pass the hotel data to the booking page
    };

    return (
        <Container sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>
                    {hotel.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <Rating value={hotel.rating || 0} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        ({hotel.rating || 'No reviews'})
                    </Typography>
                </Box>
                <Typography variant="body1" gutterBottom>
                    📍 {hotel.city} - {hotel.address}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                    {hotel.desc}
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                    ${hotel.cheapestPrice} / night
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, px: 4, py: 1.5, fontWeight: 'bold' }}
                    onClick={handleBooking}
                >
                    Book Now
                </Button>
            </Paper>
        </Container>
    );
};

export default HotelDetailsPage;