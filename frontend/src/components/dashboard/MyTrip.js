import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Alert,
  Paper,
  Avatar,
  Button,
  Grid,
  Tooltip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTripContext } from '../../hooks/useTripContext';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import { motion } from 'framer-motion';

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const MyTrip = () => {
  const { user } = useAuthContext();
  const [userTrips, setUserTrips] = useState([]);
  const [error, setError] = useState(null);
  const { setTripData } = useTripContext();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();
        setUserTrips(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, [user.token]);

  const handleSelectTrip = (trip) => {
    setTripData(trip);
  };

  return (
    <Box
      sx={{
        fontFamily: 'Quicksand, sans-serif',
        mt: 4,
        mx: { xs: 2, md: 4 },
        mb: 4,
        minHeight: '50vh',
      }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 800,
              textAlign: 'center',
              color: '#ffffff',
              letterSpacing: '-1px',
              background: 'linear-gradient(90deg, #00DDEB, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(124, 77, 255, 0.4)',
              fontFamily: 'Quicksand, sans-serif',
            }}
          >
            My Adventures
          </Typography>
        </motion.div>

        {error ? (
          <motion.div variants={itemVariants}>
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '12px',
                background: 'rgba(255, 82, 82, 0.2)',
                color: '#FF6F61',
                fontFamily: 'Quicksand, sans-serif',
                p: 2,
              }}
            >
              {error}
            </Alert>
          </motion.div>
        ) : userTrips.length === 0 ? (
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '1.1rem',
              }}
            >
              No trips found. Start planning your next adventure!
            </Typography>
          </motion.div>
        ) : (
          <Box
            sx={{
              maxHeight: '650px',
              overflowY: 'auto',
              overflowX: 'hidden',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '2px',
                marginRight: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#00DDEB',
                borderRadius: '10px',
                                marginLeft: '4px',
                '&:hover': {
                  backgroundColor: '#7C4DFF',
                },
              },
            }}
          >
            <List>
              {userTrips.map((trip) => (
                <motion.div key={trip._id} variants={itemVariants}>
                  <Paper
                    elevation={4}
                    sx={{
                      borderRadius: '16px',
                      mb: 3,
                      p: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      minHeight: '150px',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textAlign: 'center',
                        mb: 2,
                        fontSize: '0.85rem',
                        fontFamily: 'Quicksand, sans-serif',
                      }}
                    >
                      Trip ID: {trip.id}
                    </Typography>

                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: '#00DDEB',
                            width: 60,
                            height: 60,
                            boxShadow: '0 0 10px rgba(0, 221, 235, 0.5)',
                            margin: '0 auto',
                          }}
                        >
                          <LocationOnIcon fontSize="large" />
                        </Avatar>
                      </Grid>

                      <Grid item xs={12} sm={7}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: '#ffffff',
                            fontFamily: 'Quicksand, sans-serif',
                          }}
                        >
                          {trip.destinations[0]?.name || 'Unnamed Trip'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontFamily: 'Quicksand, sans-serif',
                            mt: 0.5,
                          }}
                        >
                          {trip.destinations.length > 1
                            ? `+ ${trip.destinations.length - 1} more destinations`
                            : 'Single destination'}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ color: '#00DDEB', fontSize: '1.2rem' }} />
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.9rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                              }}
                            >
                              {trip.days || 'N/A'} Days
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AttachMoneyIcon sx={{ color: '#00DDEB', fontSize: '1.2rem' }} />
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: 'Quicksand, sans-serif',
                                fontSize: '0.9rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                              }}
                            >
                              {trip.budget
                                ? trip.budget.charAt(0).toUpperCase() + trip.budget.slice(1)
                                : 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                        <Tooltip title="View trip details">
                          <Button
                            variant="contained"
                            sx={{
                              fontFamily: 'Quicksand, sans-serif',
                              fontWeight: 700,
                              background: 'linear-gradient(45deg, #00DDEB, #7C4DFF)',
                              borderRadius: '12px',
                              textTransform: 'none',
                              maxWidth: '150px',
                              py: 1,
                              px: 3,
                              boxShadow: '0 4px 12px rgba(0, 221, 235, 0.3)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #00B7C2, #5E35B1)',
                                boxShadow: '0 6px 16px rgba(124, 77, 255, 0.4)',
                                transform: 'translateY(-2px)',
                              },
                            }}
                            onClick={() => handleSelectTrip(trip)}
                          >
                            View Trip
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        maxWidth: '200px',
                        right: 20,
                        px: 2,
                        py: 0.5,
                        borderRadius: '8px',
                        backgroundColor: trip.isOptimized ? '#00DDEB' : '#FF6F61',
                        color: '#ffffff',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                      }}
                    >
                      {trip.isOptimized ? 'Optimized' : 'Not Optimized'}
                    </Box>
                  </Paper>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </motion.div>
              ))}
            </List>
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

export default MyTrip;