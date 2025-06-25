import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Grid,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { GoogleMap, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useTripContext } from '../../hooks/useTripContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Define theme with modern colors and typography
const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
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
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
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

const BestRoute = () => {
  const [directions, setDirections] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [success, setSuccess] = useState(null);
  const autocompleteRef = useRef(null);
  const { tripData, updateTripData } = useTripContext();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };
        setStartLocation(currentLocation);
        setMapCenter(currentLocation);
      },
      () => {
        setError('Unable to fetch current location. Using default location.');
        setMapCenter({ lat: 6.9271, lng: 79.8612 });
        setStartLocation({ lat: 6.9271, lng: 79.8612 });
      }
    );
  }, []);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setStartLocation(newLocation);
        setMapCenter(newLocation);
      }
    }
  };

  const calculateRoute = async () => {
    if (!tripData || tripData.destinations.length === 0) {
      setError('Please provide at least one destination.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const geocoder = new window.google.maps.Geocoder();
      const geocodedDestinations = await Promise.all(
        tripData.destinations.map((dest) => {
          if (!dest.name) {
            throw new Error('Invalid destination address');
          }
          return new Promise((resolve, reject) => {
            geocoder.geocode({ address: dest.name }, (results, status) => {
              if (status === 'OK' && results[0]) {
                resolve({
                  ...dest,
                  position: results[0].geometry.location.toJSON(),
                });
              } else {
                reject(new Error(`Failed to geocode: ${dest.name}`));
              }
            });
          });
        })
      );

      const waypoints = geocodedDestinations.map((destination) => ({
        location: destination.position,
        stopover: true,
      }));

      const directionsService = new window.google.maps.DirectionsService();
      const result = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: startLocation,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints.slice(0, -1),
            optimizeWaypoints: true,
            travelMode: travelMode,
          },
          (result, status) => {
            if (status === 'OK') {
              resolve(result);
            } else {
              reject(new Error(`Directions request failed: ${status}`));
            }
          }
        );
      });

      setDirections(result);

      const waypointOrder = result.routes[0].waypoint_order;
      const optimizedDestinations = waypointOrder.map((index) => geocodedDestinations[index]);
      const missingDestinations = geocodedDestinations.filter(
        (dest, index) => !waypointOrder.includes(index)
      );
      const finalOptimizedDestinations = [...optimizedDestinations, ...missingDestinations];

      await saveOptimizedRouteToDB(finalOptimizedDestinations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearRoute = () => {
    setDirections(null);
    updateTripData({ destinations: [] });
    setError(null);
    setSuccess(null);
  };

  const handleRemoveDestination = (index) => {
    const newDestinations = [...tripData.destinations];
    newDestinations.splice(index, 1);
    updateTripData({ destinations: newDestinations });
  };

  const saveOptimizedRouteToDB = async (optimizedDestinations) => {
    try {
      const response = await fetch('/api/trips/save-optimized-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: tripData.id,
          optimizedDestinations,
          isOptimized: true,
        }),
      });

      if (response.status === 200) {
        setSuccess('Optimized route saved successfully!');
      } else {
        throw new Error('Failed to save optimized route');
      }
    } catch (error) {
      console.error('Error saving optimized route:', error.message);
      setError('Failed to save optimized route to the database.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{ mt: 4, px: { xs: 2, md: 4 }, mb: 4 }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '20px',

            transition: 'all 0.3s ease',
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 800,
                color: '#ffffff',
                textAlign: 'center',
                letterSpacing: '-1px',
                background: 'linear-gradient(90deg, #00DDEB, #7C4DFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px rgba(124, 77, 255, 0.4)',
              }}
            >Route Finder
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <TextField
                      label="Start Location"
                      fullWidth
                      margin="normal"
                      value={typeof startLocation === 'string' ? startLocation : ''}
                      onChange={(e) => setStartLocation(e.target.value)}
                      placeholder="Enter your start location"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: '#ffffff',
                          fontFamily: 'Inter, sans-serif',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00DDEB',
                        },
                      }}
                    />
                  </Autocomplete>
                  <List sx={{ mt: 2 }}>
                    {(tripData.destinations || []).map((dest, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <Tooltip title="Remove Destination">
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleRemoveDestination(index)}
                              sx={{
                                color: '#7C4DFF',
                                '&:hover': { color: '#FF6F61' },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        sx={{
                          mb: 1,
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.08)',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <ListItemText
                          primary={dest.name}
                          primaryTypographyProps={{
                            fontFamily: 'Quicksand, sans-serif',
                            color: '#ffffff',
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={calculateRoute}
                      disabled={loading}
                      sx={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #00DDEB, #7C4DFF)',
                        borderRadius: '12px',
                        textTransform: 'none',
                        py: 1.2,
                        px: 3,
                        boxShadow: '0 4px 12px rgba(0, 221, 235, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00B7C2, #5E35B1)',
                          boxShadow: '0 6px 16px rgba(124, 77, 255, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                          background: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Find Route'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={clearRoute}
                      sx={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontWeight: 700,
                        color: '#ffffff',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        textTransform: 'none',
                        py: 1.2,
                        px: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#7C4DFF',
                          color: '#7C4DFF',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Clear Route
                    </Button>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontWeight: 600,
                        color: '#ffffff',
                      }}
                    >
                      Travel Mode
                    </Typography>
                    <Select
                      value={travelMode}
                      onChange={(e) => setTravelMode(e.target.value)}
                      fullWidth
                      sx={{
                        mt: 1,
                        color: '#ffffff',
                        '& .MuiSelect-select': {
                          fontFamily: 'Quicksand, sans-serif',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00DDEB',
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    >
                      <MenuItem value="DRIVING">
                        <DirectionsCarIcon sx={{ mr: 1, color: '#00DDEB' }} /> Driving
                      </MenuItem>
                      <MenuItem value="WALKING">
                        <DirectionsWalkIcon sx={{ mr: 1, color: '#00DDEB' }} /> Walking
                      </MenuItem>
                      <MenuItem value="BICYCLING">
                        <DirectionsBikeIcon sx={{ mr: 1, color: '#00DDEB' }} /> Bicycling
                      </MenuItem>
                    </Select>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    height: '450px',
                  }}
                >
                  <GoogleMap
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    zoom={10}
                    center={mapCenter}
                    options={{
                      styles: [
                        {
                          elementType: 'geometry',
                          stylers: [{ color: '#1A1A2E' }],
                        },
                        {
                          elementType: 'labels.text.stroke',
                          stylers: [{ color: '#1A1A2E' }],
                        },
                        {
                          elementType: 'labels.text.fill',
                          stylers: [{ color: '#FFFFFF' }],
                        },
                        {
                          featureType: 'road',
                          elementType: 'geometry',
                          stylers: [{ color: '#2A2A4A' }],
                        },
                        {
                          featureType: 'road',
                          elementType: 'labels.text.fill',
                          stylers: [{ color: '#00DDEB' }],
                        },
                        {
                          featureType: 'water',
                          stylers: [{ color: '#0A2742' }],
                        },
                      ],
                    }}
                  >
                    {directions && <DirectionsRenderer directions={directions} />}
                  </GoogleMap>
                </Box>
                {directions && (
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        flex: '1 1 45%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 6px 16px rgba(124, 255, 235, 0.3)',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, mb: 0.5 }}
                      >
                        Total Distance
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem' }}
                      >
                        {(directions.routes[0].legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000).toFixed(2)} km
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        flex: '1 1 45%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 6px 16px rgba(124, 255, 235, 0.3)',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, mb: 0.5 }}
                      >
                        Total Duration
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem' }}
                      >
                        {Math.ceil(directions.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60)} mins
                      </Typography>
                    </Paper>
                  </Box>
                )}
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: 2,
                      borderRadius: '12px',
                      background: 'rgba(255, 82, 82, 0.2)',
                      color: '#FF6F61',
                    }}
                  >
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert
                    severity="success"
                    sx={{
                      mt: 2,
                      borderRadius: '12px',
                      background: 'rgba(0, 255, 83, 0.2)',
                      color: '#69F0E',
                    }}
                  >
                    {success}
                  </Alert>
                )}
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default BestRoute;