    import { Box, Grid, Typography, Button, Container } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';

import { Link } from 'react-router-dom';

const services = [
    { icon: <DirectionsCarIcon fontSize="large" />, title: 'Car Rental' },
    { icon: <DirectionsBikeIcon fontSize="large" />, title: 'Bike Rental' },
    { icon: <EventAvailableIcon fontSize="large" />, title: 'Online Booking' },
    { icon: <PaymentIcon fontSize="large" />, title: 'Online Payment' }
];

const VehicleRentalLanding = () => {
    return (
        <Box sx={{ backgroundColor: '#0d1117', color: '#fff', padding: 4, margin: 0, fontFamily: 'Poppins, sans-serif' }}>
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, animation: 'fadeIn 1s ease-in-out' }}>
                            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                                Rent a Car
                            </Typography>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#e91e63', fontFamily: 'Poppins, sans-serif' }}>
                                Start driving today
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom sx={{ color: '#aaa', fontFamily: 'Poppins, sans-serif' }}>
                                Experience the best car rental service with a wide range of vehicles and excellent customer support.
                            </Typography>
                            <Link to='/services/car-rental'>
                                <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#e91e63', '&:hover': { backgroundColor: '#d81b60' }, color: '#fff', boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)' }}>
                                    Go to centers
                                </Button>
                            </Link>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: 400, height: 400, borderRadius: '50%', backgroundColor: 'rgba(233, 30, 99, 0.2)', position: 'absolute', zIndex: 1, filter: 'blur(30px)' }} />
                        <Box component="img" src="./images/header.png" alt="Header Image" sx={{ zIndex: 2, width: '60%', maxWidth: 300, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 8 }}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                        Our Services
                    </Typography>
                    <Grid container spacing={4}>
                        {services.map((service, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                                    {service.icon}
                                    <Typography variant="h6" component="h3" sx={{ marginTop: 2, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                                        {service.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default VehicleRentalLanding;
