import React, { useRef } from 'react';
import { Box, Grid, Typography, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { motion, useInView } from 'framer-motion';

const destinations = [
  {
    image: './landing_page/sigiriya.jpg',
  },
  {
    image: './landing_page/ella.jpg',
  },
  {
    image: './landing_page/galle.jpg',
  },
  {
    image: './landing_page/kandy.jpeg',
  },
];

// Styled components for improved modern design
const theme = {
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
  },
};

const DescriptionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  color: 'white',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

const ImageGallery = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing(4),
  justifyContent: 'center',
  width: '100%',
}));

const DestinationCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.15)', // Light glass effect
  backdropFilter: 'blur(10px)', // Blur background for glassmorphism
  border: 'none',
  borderRadius: theme.spacing(3), // Rounded corners
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Soft initial shadow
  transition: 'transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)', // Lift effect with scale
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)', // Deeper shadow on hover
    background: 'rgba(255, 255, 255, 0.25)', // Slightly increase brightness on hover
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1))',
    zIndex: 1,
  },
  '& img': {
    transition: 'transform 0.4s ease',
  },
  '&:hover img': {
    transform: 'scale(1.1)', // Slight zoom-in on the image
  },
}));


const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  borderRadius: theme.spacing(2),
  transition: 'opacity 0.3s ease',
  opacity: 0,
  '&:hover': {
    opacity: 1,
  },
}));

// Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const TouristDestinations = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} ref={sectionRef}>
      <Box
        sx={{
          padding: 6,
          bgcolor: '#00263b',
          pt: { xs: 6, sm: 12 },
          pb: { xs: 6, sm: 12 },
          width: '100vw',
          overflowX: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <Grid container spacing={6} alignItems="center">
          {/* Description Section */}
          <Grid item xs={12} md={6}>
            <DescriptionContainer>
              <Typography
                component="h2"
                variant="h4"
                gutterBottom
                sx={{
                  fontFamily: 'Quicksand, Arial, sans-serif',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  mb: 2,
                }}
              >
                Discover Sri Lanka
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                Explore the most iconic tourist destinations in Sri Lanka. From the historic
                Sigiriya Rock Fortress to the scenic beauty of Ella, Sri Lanka offers a rich tapestry
                of cultural and natural wonders.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                Plan your journey with confidence, knowing you are visiting the most renowned and
                cherished locations on the island.
              </Typography>
            </DescriptionContainer>
          </Grid>

          {/* Image Gallery Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
            >
              <ImageGallery>
                {destinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <DestinationCard>
                      <Box position="relative">
                        <CardMedia
                          component="img"
                          alt="Tourist Destination"
                          image={destination.image}
                          title="Destination"
                          sx={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                            borderRadius: 2,
                          }}
                        />
                        <Overlay />
                      </Box>
                    </DestinationCard>
                  </motion.div>
                ))}
              </ImageGallery>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default TouristDestinations;
