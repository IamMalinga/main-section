import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MapIcon from '@mui/icons-material/Map';
import ChatIcon from '@mui/icons-material/Chat';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsIcon from '@mui/icons-material/Directions';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const items = [
  {
    icon: <MapIcon fontSize="large" />,
    title: 'Comprehensive Maps',
    description: 'Navigate Sri Lanka’s top tourist destinations with our detailed and interactive maps.',
  },
  {
    icon: <HotelIcon fontSize="large" />,
    title: 'Best Accommodation Options',
    description: 'Discover and book the best hotels, guesthouses, and stays during your travels.',
  },
  {
    icon: <RestaurantIcon fontSize="large" />,
    title: 'Top Dining Recommendations',
    description: 'Explore and enjoy the finest dining experiences at local and international restaurants.',
  },
  {
    icon: <ChatIcon fontSize="large" />,
    title: 'Traveler Community',
    description: 'Connect with fellow travelers, share experiences, and get real-time travel tips.',
  },
  {
    icon: <DirectionsIcon fontSize="large" />,
    title: 'Optimized Route Planning',
    description: 'Plan your trip with our smart route suggestions, ensuring you see all the best spots efficiently.',
  },
  {
    icon: <SupportAgentIcon fontSize="large" />,
    title: '24/7 Travel Assistance',
    description: 'Get round-the-clock support for any issues or queries during your journey.',
  },
];

// Styled Framer Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#00ADB5',
    },
    background: {
      default: '#033363',
    },
  },
});

export default function Highlights() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <ThemeProvider theme={theme}>
      <Box
        id="highlights"
        ref={sectionRef}
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 4, sm: 16 },
          color: 'white',
          bgcolor: '#033363',
          width: '100vw',
          position: 'relative',
        }}
      >
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 4, sm: 6 },
          }}
        >
          {/* Title Section */}
          <Box
            sx={{
              width: { sm: '100%', md: '60%' },
              textAlign: 'center',
              mb: 4,
            }}
          >
            <Typography
              component="h2"
              variant="h4"
              fontWeight="bold"
              sx={{ fontFamily: 'Quicksand' }}
            >
              Highlights
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Quicksand',
                color: 'rgba(255, 255, 255, 0.8)',
                mt: 1,
              }}
            >
              Explore the features that make our travel planning app the perfect companion for your
              journey. From detailed maps to real-time community support, our app has everything you
              need to ensure a smooth and enjoyable travel experience.
            </Typography>
          </Box>

          {/* Highlights Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <Grid container spacing={3}>
              {items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={fadeUpVariants}>
                    <Stack
                      component={Card}
                      direction="column"
                      spacing={2}
                      sx={{
                        width: '80%',
                        height: 180, // Consistent height
                        p: 4,
                        background: 'linear-gradient(145deg, #02274d, #044b80)',
                        borderRadius: 3,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
                        },
                        color: 'white',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '3rem',
                          color: '#00ADB5',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        fontWeight="bold"
                        fontSize="1.2rem"
                        sx={{ fontFamily: 'Quicksand', textAlign: 'center' }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Quicksand',
                          color: 'rgba(255, 255, 255, 0.8)',
                          textAlign: 'center',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Stack>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
