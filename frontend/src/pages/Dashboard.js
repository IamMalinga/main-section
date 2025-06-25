import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Typography,
  Slide,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Banner from '../components/dashboard/Banner';
import MyTrip from '../components/dashboard/MyTrip';
import BestRoute from '../components/dashboard/BestRoute';
import Services from '../components/dashboard/Services';
import RecentUsedServices from '../components/dashboard/RecentUsedServices';
import Notifications from '../components/dashboard/Notifications';
import TripDetails from '../components/dashboard/TripDetails';
import Destinations from '../components/dashboard/Destinations';
import ExploreIcon from '@mui/icons-material/Explore';
import CloseIcon from '@mui/icons-material/Close';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import { useAuthContext } from '../authentication/hooks/useAuthContext';
import { useTripContext } from '../hooks/useTripContext';
import { useNavigate } from 'react-router-dom';

// Animation variants
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const [openSelectTripDialog, setOpenSelectTripDialog] = useState(false);
  const [openNoTripsDialog, setOpenNoTripsDialog] = useState(false);
  const { user } = useAuthContext();
  const { tripData, setTripData } = useTripContext();
  const [userTrips, setUserTrips] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

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
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setUserTrips(data);
          if (!tripData) {
            setOpenSelectTripDialog(true);
          }
        } else {
          setUserTrips([]);
          setOpenNoTripsDialog(true);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
        setUserTrips([]);
        setOpenNoTripsDialog(true);
      }
    };

    fetchTrips();
  }, [user.token, setTripData, tripData]);

  const handleSelectTrip = (trip) => {
    setTripData(trip);
    setOpenSelectTripDialog(false);
  };

  const handleNoTripsNavigate = (destination) => {
    setOpenNoTripsDialog(false);
    if (destination === 'planner') {
      navigate('/trip-planner');
    } else {
      navigate('/');
    }
  };

  if (userTrips.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4A 100%)',
          textAlign: 'center',
          p: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 4,
                px: { xs: 2, md: 6 },
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <motion.div variants={itemVariants}>
                <Box
                  component="img"
                  src="https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/profile-pictures%2Fassets%2Fno-trips.png?alt=media&token=10b6f3fe-d0e3-4311-bf62-19d076344d3f"
                  alt="No Trips Icon"
                  sx={{
                    width: { xs: '200px', sm: '300px', md: '400px' },
                    height: 'auto',
                    mb: { xs: 4, md: 0 },
                    filter: 'drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.3))',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '600px' }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 800,
                      mb: 2,
                      color: '#ffffff',
                      letterSpacing: '-1px',
                      background: 'linear-gradient(90deg, #00DDEB, #7C4DFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 8px rgba(124, 77, 255, 0.4)',
                    }}
                  >
                    No Adventures Yet!
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      mb: 3,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    Your journey starts here.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.8,
                      fontSize: '1.1rem',
                    }}
                  >
                    Ready to explore the world? Plan your dream trip with our intuitive trip planner
                    or get inspired on our homepage.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                  >
                    <Button
                      onClick={() => handleNoTripsNavigate('planner')}
                      startIcon={<AddCircleOutlineIcon />}
                      variant="contained"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #00DDEB, #7C4DFF)',
                        borderRadius: '16px',
                        textTransform: 'none',
                        py: 1.5,
                        px: 4,
                        boxShadow: '0 4px 12px rgba(0, 221, 235, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00B7C2, #5E35B1)',
                          boxShadow: '0 6px 16px rgba(124, 77, 255, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Plan Your Trip
                    </Button>
                    <Button
                      onClick={() => handleNoTripsNavigate('home')}
                      startIcon={<HomeIcon />}
                      variant="outlined"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        color: '#ffffff',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '16px',
                        textTransform: 'none',
                        py: 1.5,
                        px: 4,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#00DDEB',
                          color: '#00DDEB',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Explore Home
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </motion.div>

          <Dialog
            open={openNoTripsDialog}
            onClose={() => setOpenNoTripsDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: '20px',
                padding: 3,
                background: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4A 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                maxWidth: '500px',
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <CloudOffIcon sx={{ color: '#00DDEB', fontSize: '2rem' }} />
              No Trips Found
            </DialogTitle>
            <DialogContent
              sx={{
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
              }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                It looks like you haven’t planned any trips yet. Start your adventure with our Trip
                Planner or explore more on the Home page!
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                gap: 2,
                pb: 2,
              }}
            >
              <Button
                onClick={() => handleNoTripsNavigate('planner')}
                startIcon={<AddCircleOutlineIcon />}
                variant="contained"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00DDEB, #7C4DFF)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.2,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00B7C2, #5E35B1)',
                    boxShadow: '0 4px 12px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                Go to Trip Planner
              </Button>
              <Button
                onClick={() => handleNoTripsNavigate('home')}
                startIcon={<HomeIcon />}
                variant="outlined"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.2,
                  px: 3,
                  '&:hover': {
                    borderColor: '#00DDEB',
                    color: '#00DDEB',
                  },
                }}
              >
                Go to Home
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4A 100%)',
        py: 6,
        px: { xs: 2, md: 6 },
      }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Banner />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                }}
              >
                <TripDetails />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <MyTrip />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                  transition: 'all 0.3s ease',
                                  
                }}
              >
                <BestRoute />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <Services />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <RecentUsedServices />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <Notifications />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <Destinations />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <Dialog
        fullScreen={fullScreen}
        open={openSelectTripDialog}
        onClose={() => setOpenSelectTripDialog(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, md: '20px' },
            background: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4A 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            maxWidth: '500px',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.8rem',
            color: '#ffffff',
            textAlign: 'center',
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Select Your Adventure
          <Tooltip title="Close">
            <IconButton
              onClick={() => setOpenSelectTripDialog(false)}
              sx={{ color: '#00DDEB' }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            p: 3,
          }}
        >
          <List>
            {userTrips.map((trip) => (
              <ListItem
                button
                onClick={() => handleSelectTrip(trip)}
                key={trip._id}
                sx={{
                  borderRadius: '12px',
                  mb: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemText
                  primary={`${trip.destinations[0]?.name || 'Unnamed Trip'} - ${trip.days} days`}
                  primaryTypographyProps={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                  secondary={trip.destinations[0]?.description || 'No description'}
                  secondaryTypographyProps={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            py: 2,
          }}
        >
          <Button
            onClick={() => setOpenSelectTripDialog(false)}
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              color: '#00DDEB',
              textTransform: 'none',
              '&:hover': {
                color: '#7C4DFF',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;