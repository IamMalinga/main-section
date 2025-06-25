import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bannerVideo from '../video/banner.mp4';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';

const BannerBox = styled(Box)({
  position: 'relative',
  height: '80vh',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', // Ensures the video fits within the container
  fontFamily: 'Quicksand, Arial, sans-serif',
});

const Video = styled('video')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  transform: 'translate(-50%, -50%)',
  zIndex: -1,
});

// Framer Motion Variants
const buttonVariants = {
  initial: {
    opacity: 0.5,
    scale: 0.8,
  },
  animate: {
    opacity: [0.8, 1, 0.8], // Smooth fade in/out
    scale: [1, 1.1, 1], // Subtle scaling loop
    backgroundColor: ['#033363', '#044b80', '#033363'], // Dark blue gradient loop
    x: [-5, 5, -5], // Random horizontal movement
    y: [-5, 5, -5], // Random vertical movement
    transition: {
      duration: 2, // Time for one loop
      repeat: Infinity, // Infinite loop
      repeatType: 'reverse', // Reverses back and forth
      ease: 'easeInOut',
    },
  },
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.3, // Quick response on hover
    },
  },
};

const StyledButton = styled(motion.button)({
  position: 'relative',
  top: '300%',
  fontSize: '1rem',
  padding: '14px 36px',
  borderRadius: '30px',
  border: 'none',
  fontFamily: 'Quicksand, Arial, sans-serif',
  fontWeight: 'bold',
  color: '#fff',
  cursor: 'pointer',
  background: 'linear-gradient(135deg,rgb(0, 80, 160),rgb(0, 71, 95))', // Modern blue gradient
  boxShadow: '0 8px 20px rgba(0, 191, 255, 0.4)', // Soft blue glow
  textTransform: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)', // Subtle zoom-in effect
    background: 'linear-gradient(135deg, #4682B4, #1E90FF)', // Slightly darker gradient
    boxShadow: '0 12px 25px rgba(0, 191, 255, 0.6)', // Enhanced glow on hover
  },
});

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const startTrip = () => {
    if (user) {
      navigate('/trip-planner');
    } else {
      navigate('/login');
    }
  };

  return (
    <BannerBox>
      <Video autoPlay loop muted playsInline>
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>

      <Box textAlign="center">
        <StyledButton
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          onClick={startTrip}
        >
          Start Your Journey
        </StyledButton>
      </Box>
    </BannerBox>
  );
};

export default Banner;
