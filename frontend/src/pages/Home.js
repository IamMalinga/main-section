import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Banner from '../components/Banner';
import Offers from '../components/Offers';
import Destinations from '../components/Destinations';
import Accommodations from '../components/Accommodations';
import Food from '../components/Food';
import PlanLikePro from '../components/PlanLikeAPro';
import Features from '../components/Features';
import Reviews from '../components/Reviews';


const Home = () => {
    return(
    <Box>
    <Banner />
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>Plan like a Pro</Typography>
        <PlanLikePro />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>Special Offers</Typography>
        <Offers />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>Popular Destinations</Typography>
        <Destinations />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>Features</Typography>
        <Features />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>Accommodations</Typography>
        <Accommodations />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>Food</Typography>
        <Food />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', borderBottom: '2px solid #1976d2', pb: 1 }}>What travelers are raving about</Typography>
        <Reviews />
      </Box>
    </Container>
  </Box>
    )
}

export default Home;