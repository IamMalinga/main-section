import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Alert,
  Tooltip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTripContext } from '../hooks/useTripContext';
import { useAuthContext } from '../authentication/hooks/useAuthContext';

// Define modern theme with neon-inspired colors
const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h5: { fontWeight: 600 },
    body2: { fontSize: '0.9rem', lineHeight: 1.6 },
  },
  palette: {
    primary: {
      main: '#00DDEB', // Cyan for primary actions
    },
    secondary: {
      main: '#7C4DFF', // Purple for secondary actions
    },
    background: {
      default: '#1A1A2E', // Dark background for futuristic look
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#000',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
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
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#000',
          fontFamily: 'Quicksand, sans-serif',
          borderRadius: '8px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
  },
});

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
  const { setTripData } = useTripContext();
  const [userTrips, setUserTrips] = useState([]);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState({ open: false, message: '', success: false });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch trips');
        const data = await response.json();
        setUserTrips(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrips();
  }, [user.token]);

  const handleActivateTrip = async (tripId) => {
    try {
      const response = await fetch(`/api/trips/activate/${tripId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) throw new Error('Failed to activate trip');
      const updatedTrip = await response.json();

      setUserTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === updatedTrip._id ? updatedTrip : { ...trip, isActive: false }
        )
      );
      setTripData(updatedTrip);
      setDialog({
        open: true,
        message: 'Trip activated successfully!',
        success: true,
      });
    } catch (err) {
      setDialog({
        open: true,
        message: 'Failed to activate trip. Please try again.',
        success: false,
      });
    }
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, message: '', success: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          mt: 32,
          mx: { xs: 2, md: 4 },
          mb: 8,
          maxWidth: '1400px',
          margin: 'auto',
        }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 700,
                textAlign: 'center',
                fontFamily: 'Quicksand, sans-serif',
                background: 'linear-gradient(90deg, #00DDEB, #7C4DFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px rgba(124, 77, 255, 0.4)',
              }}
            >
              My Adventures
            </Typography>
          </motion.div>

          {error && (
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
          )}

          {!error && userTrips.length === 0 && (
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
          )}

          <Grid container spacing={3} sx={{ maxWidth: '100%', mt:4 }}>
            {userTrips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip._id}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={6}
                    sx={{
                      borderRadius: '16px',
                      p: 3,
                      background: trip.isActive
                        ? 'linear-gradient(45deg, rgba(0, 221, 235, 0.2), rgba(124, 77, 255, 0.2))'
                        : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: "#000" }}>
                      <Avatar
                        sx={{
                          bgcolor: '#00DDEB',
                          width: 56,
                          height: 56,
                          boxShadow: '0 0 10px rgba(0, 221, 235, 0.5)',
                        }}
                      >
                        <LocationOnIcon fontSize="large" />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            fontFamily: 'Quicksand, sans-serif',
                            color: "#000"
                          }}
                        >
                          {trip.destinations[0]?.name || 'Unnamed Trip'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'Quicksand, sans-serif',
                            color: 'rgba(3, 3, 3, 0.7)',
                          }}
                        >
                          {trip.destinations.length > 1
                            ? `+ ${trip.destinations.length - 1} more destinations`
                            : 'Single destination'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ color: '#00DDEB', fontSize: '1.2rem' }} />
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'Quicksand, sans-serif', color: 'rgba(0, 0, 0, 0.9)' }}
                        >
                          Days: {trip.days || 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#00DDEB', fontSize: '1.2rem' }} />
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'Quicksand, sans-serif', color: 'rgba(0, 0, 0, 0.9)' }}
                        >
                          Budget: {trip.budget ? trip.budget.charAt(0).toUpperCase() + trip.budget.slice(1) : 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PeopleIcon sx={{ color: '#00DDEB', fontSize: '1.2rem' }} />
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'Quicksand, sans-serif', color: 'rgba(0, 0, 0, 0.9)' }}
                        >
                          People: {trip.people || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {trip.services.map((service, index) => (
                        <Chip
                          key={index}
                          label={service}
                          sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            fontFamily: 'Quicksand, sans-serif',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.2)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title={trip.isActive ? 'Trip is already active' : 'Activate this trip'}>
                        <Button
                          variant="contained"
                          onClick={() => handleActivateTrip(trip._id)}
                          disabled={trip.isActive}
                          sx={{
                            fontFamily: 'Quicksand, sans-serif',
                            background: trip.isActive
                              ? 'linear-gradient(45deg, #00B7C2, #5E35B1)'
                              : 'linear-gradient(45deg, #00DDEB, #7C4DFF)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #00B7C2, #5E35B1)',
                            },
                            '&:disabled': {
                              background: 'rgba(255, 255, 255, 0.2)',
                              color: 'rgba(0, 0, 0, 0.5)',
                            },
                          }}
                        >
                          {trip.isActive ? 'Active' : 'Activate'}
                        </Button>
                      </Tooltip>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Activation/Message Dialog */}
          <Dialog
            open={dialog.open}
            onClose={handleCloseDialog}
            PaperProps={{
              sx: {
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                p: 2,
              },
            }}
          >
            <DialogContent sx={{ textAlign: 'center', py: 4 }}>
              {dialog.success ? (
                <CheckCircleIcon sx={{ color: '#00DDEB', fontSize: '2.5rem', mb: 2 }} />
              ) : (
                <CloseIcon sx={{ color: '#FF6F61', fontSize: '2.5rem', mb: 2 }} />
              )}
              <Typography
                variant="h6"
                sx={{ fontFamily: 'Quicksand, sans-serif', color: '#ffffff' }}
              >
                {dialog.message}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  fontFamily: 'Quicksand, sans-serif',
                  color: '#00DDEB',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#7C4DFF',
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default MyTrip;