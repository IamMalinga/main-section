import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../assets/banner-image.jpg';

const BannerBox = styled(Box)({
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '400px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const BannerTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
});

const BannerSubtitle = styled(Typography)({
  fontSize: '1.5rem',
  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
});

const Banner = () => {
  const navigate = useNavigate();

  const startTrip = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/trip-planner');
    } else {
      navigate('/login');
    }
  };

  return (
    <BannerBox>
      <BannerTitle>
        Discover, Explore, Wander
      </BannerTitle>
      <BannerSubtitle>
        Experience the beauty of Sri Lanka
      </BannerSubtitle>
      <Button variant="contained" onClick={startTrip} sx={{ mt: 4 }}>
        Start Trip
      </Button>
    </BannerBox>
  );
};

export default Banner;
