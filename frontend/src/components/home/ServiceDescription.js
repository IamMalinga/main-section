import React from 'react';
import { Container, Grid, Typography, Box, Paper, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const img = [
  { title: 'Chat', image: './landing_page/chat.png' },
];

// Styled Components
const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const DescriptionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
}));

// Framer Motion Variants for Image Animation
const zoomVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 3, // Total duration of the zoom loop
      repeat: Infinity, // Infinite loop
      ease: 'easeInOut', // Smooth easing
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceDescription = () => {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
      <Paper
        elevation={0}
        sx={{
          pt: { xs: 6, sm: 12 },
          pb: { xs: 6, sm: 16 },
          bgcolor: '#022a4f',
          color: 'white',
          width: '100vw',
          overflowX: 'hidden',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <ImageContainer>
                <motion.div variants={zoomVariants} animate="animate">
                  <StyledCardMedia
                    component="img"
                    alt={img[0].title}
                    height="100%"
                    image={img[0].image}
                  />
                </motion.div>
              </ImageContainer>
            </Grid>

            {/* Description Section */}
            <Grid item xs={12} md={6}>
              <DescriptionContainer>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: 'Quicksand, Arial, sans-serif',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                >
                  Connect with Fellow Travelers
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontFamily: 'Quicksand, Arial, sans-serif',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8,
                  }}
                >
                  Our app allows you to connect with other travelers visiting similar destinations.
                  Share tips, get real-time updates, and enhance your travel experience by staying
                  connected with the community.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Quicksand, Arial, sans-serif',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8,
                  }}
                >
                  Whether you’re visiting the scenic landscapes of Ella or the vibrant streets of
                  Colombo, our chat feature helps you stay informed and engaged with fellow
                  explorers.
                </Typography>
              </DescriptionContainer>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </motion.div>
  );
};

export default ServiceDescription;
