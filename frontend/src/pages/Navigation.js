import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    Card,
    CardContent,
    Box,
    IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import WeatherIcon from '@mui/icons-material/Thunderstorm';
import PlaceIcon from '@mui/icons-material/Place';

const services = [
    {
        title: 'Recommendation System',
        description: 'Get personalized recommendations based on your preferences and past experiences.',
        icon: <TravelExploreIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/recommendation-system',
    },
    {
        title: 'Distance Calculation',
        description: 'Calculate the optimal routes and distances for your planned trips.',
        icon: <MapIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/distance-calculation',
    },
    {
        title: 'Lodging and Dining Suggestions',
        description: 'Find the best places to stay and eat during your travels.',
        icon: <HotelIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/lodging-dining',
    },
    {
        title: 'Vehicle Rental/Hire Services',
        description: 'Book vehicles for rent and enjoy your journey.',
        icon: <DirectionsCarIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/vehicle-rental',
    },
    {
        title: 'Restaurant Reservations',
        description: 'Make reservations at top restaurants easily.',
        icon: <RestaurantIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/restaurant-reservations',
    },
    {
        title: 'Flight Booking',
        description: 'Book your flights with the best deals and discounts.',
        icon: <FlightIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/flight-booking',
    },
    {
        title: 'Guided Tours',
        description: 'Explore guided tours with experienced guides.',
        icon: <DirectionsWalkIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/guided-tours',
    },
    {
        title: 'Special Events',
        description: 'Discover and book tickets for special events.',
        icon: <EventIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/special-events',
    },
    {
        title: 'Weather Updates',
        description: 'Get real-time weather updates for your destinations.',
        icon: <WeatherIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/weather-updates',
    },
    {
        title: 'Local Deals and Offers',
        description: 'Find the best local deals and discounts.',
        icon: <LocalOfferIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/local-deals',
    },
    {
        title: 'Place Finder',
        description: 'Locate places of interest nearby.',
        icon: <PlaceIcon sx={{ fontSize: 40, color: '#033363' }} />,
        link: '/place-finder',
    },
];

const Navigation = () => {
    return (
        <>

            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}
                >
                    Explore Our Services
                </Typography>
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} >
                            <Paper
                                elevation={6}
                                sx={{
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                    },
                                     minHeight: '320px',
                                    fontFamily: 'Quicksand, sans-serif',

                                }}
                            >
                                <Card sx={{ borderRadius: 2, boxShadow: 0 }}>
                                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                                        <IconButton size="large" disableRipple>
                                            {service.icon}
                                        </IconButton>
                                    </Box>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                            {service.description}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={service.link}
                                            sx={{
                                                mt: 2,
                                                borderRadius: '20px',
                                                borderWidth: 2,
                                                borderColor: '#033363',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#033363',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Learn More
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Navigation;
