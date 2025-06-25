import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import Banner from '../components/home/Banner';
import Destinations from '../components/home/ServiceDescription';
import TouristDestinations from '../components/home/TouristDestinations';
import Highlights from '../components/home/Highlights';
import ChatService from '../components/home/ChatService';
import Testimonials from '../components/home/Testimonials';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define a modern theme with neon-inspired colors
const getModernTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#00DDEB', // Cyan for primary actions
    },
    secondary: {
      main: '#7C4DFF', // Purple for secondary actions
    },
    background: {
      default: mode === 'light' ? '#F0F4F8' : '#1A1A2E', // Dark gradient base
      paper: mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: mode === 'light' ? '#1A1A2E' : '#FFFFFF',
      secondary: mode === 'light' ? '#455A64' : 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    h1: { fontWeight: 800, letterSpacing: '-1px' },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    body1: { fontSize: '1.1rem', lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(124, 77, 255, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #00DDEB, #7C4DFF)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00B7C2, #5E35B1)',
          },
        },
        outlinedSecondary: {
          borderColor: mode === 'light' ? '#7C4DFF' : 'rgba(255, 255, 255, 0.3)',
          color: mode === 'light' ? '#7C4DFF' : '#FFFFFF',
          '&:hover': {
            borderColor: '#00DDEB',
            color: '#00DDEB',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
          },
        },
      },
    },
  },
});

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Home = () => {
  const [mode, setMode] = React.useState('dark'); // Default to dark for modern look
  const theme = createTheme(getModernTheme(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
          <Banner />

        {/* Highlights Section */}
        <Parallax
          blur={{ min: -10, max: 10 }}
          strength={400}
          bgImageStyle={{ objectFit: 'cover', filter: mode === 'dark' ? 'brightness(0.6)' : 'none' }}
        >
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Highlights />
            </motion.div>
          </Box>
        </Parallax>

        {/* Tourist Destinations Section */}
        <Parallax
          blur={{ min: -10, max: 10 }}
          strength={400}
          bgImageStyle={{ objectFit: 'cover', filter: mode === 'dark' ? 'brightness(0.6)' : 'none' }}
        >
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <TouristDestinations />
            </motion.div>
          </Box>
        </Parallax>

        {/* Service Description Section */}
        <Parallax
          blur={{ min: -10, max: 10 }}
          strength={400}
          bgImageStyle={{ objectFit: 'cover', filter: mode === 'dark' ? 'brightness(0.6)' : 'none' }}
        >
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Destinations />
            </motion.div>
          </Box>
        </Parallax>

        {/* Chat Service Section */}
        <Parallax
          blur={{ min: -10, max: 10 }}
          strength={400}
          bgImageStyle={{ objectFit: 'cover', filter: mode === 'dark' ? 'brightness(0.6)' : 'none' }}
        >
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ChatService />
            </motion.div>
          </Box>
        </Parallax>

        {/* Testimonials Section */}
        <Parallax
          blur={{ min: -10, max: 10 }}
          strength={400}
          bgImageStyle={{ objectFit: 'cover', filter: mode === 'dark' ? 'brightness(0.6)' : 'none' }}
        >
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Testimonials />
            </motion.div>
          </Box>
        </Parallax>
      </Box>
    </ThemeProvider>
  );
};

export default Home;