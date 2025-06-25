import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 'auto',
                boxShadow: 3,
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={`${process.env.PUBLIC_URL}${hotel.photos[0]}`} // Corrected string template for image
                alt={hotel.name}
                sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    ':hover': { transform: 'scale(1.05)' },
                }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                    {hotel.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    📍 Location: {hotel.city}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    🏨 Address: {hotel.address}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={hotel.rating || 0} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                        ({hotel.rating || 'No reviews'})
                    </Typography>
                </Box>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${hotel.cheapestPrice} / night
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{
                    width: '100%',
                    borderRadius: 0,
                    py: 1.5,
                    fontWeight: 'bold',
                    ':hover': { backgroundColor: 'primary.dark' },
                }}
                component={Link}
                to={`/services/hotels/${hotel._id}`}  // Corrected string template for Link component
            >
                View Details
            </Button>
        </Card>
    );
};

export default HotelCard;