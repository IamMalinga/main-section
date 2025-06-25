import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, Grid, Card, CardContent, Avatar } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import { useTripContext } from '../../hooks/useTripContext';
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

const TripDetails = () => {
  const { tripData } = useTripContext();

  if (!tripData || !tripData.destinations) {
    return (
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          textAlign: 'center',
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4A 100%)',
        }}
      >
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-1px',
              background: 'linear-gradient(90deg, #00DDEB, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(124, 77, 255, 0.4)',
            }}
          >
            Trip Details
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
            }}
          >
            No trip selected. Plan your adventure now!
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 3, md: 5 },
        borderRadius: '20px',
        fontFamily: 'Inter, sans-serif',
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
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Your Epic Adventure
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: '#00DDEB',
                        mr: 2,
                        boxShadow: '0 0 10px rgba(0, 221, 235, 0.5)',
                      }}
                    >
                      <CalendarTodayIcon />
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <strong>Duration:</strong> {tripData.days || 'N/A'} days
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: '#00DDEB',
                        mr: 2,
                        boxShadow: '0 0 10px rgba(0, 221, 235, 0.5)',
                      }}
                    >
                      <AttachMoneyIcon />
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <strong>Budget:</strong>{' '}
                      {tripData.budget ? tripData.budget.charAt(0).toUpperCase() + tripData.budget.slice(1) : 'N/A'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: '#00DDEB',
                        mr: 2,
                        boxShadow: '0 0 10px rgba(0, 221, 235, 0.5)',
                      }}
                    >
                      <GroupIcon />
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <strong>Companions:</strong>{' '}
                      {tripData.friends && tripData.friends.length > 0 ? tripData.friends.join(', ') : 'Solo trip'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: '#00DDEB',
                        mr: 2,
                        boxShadow: '0 0 10px rgba(0, 221, 235, 0.5)',
                      }}
                    >
                      <BuildIcon />
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <strong>Services:</strong>{' '}
                      {tripData.services && tripData.services.length > 0 ? tripData.services.join(', ') : 'None selected'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: '#00DDEB',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Your Destinations
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <List
              sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#00DDEB',
                  borderRadius: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              {tripData.destinations.map((destination, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 2,
                    px: 1,
                    borderRadius: '8px',
                    mb: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <PlaceIcon sx={{ mr: 2, color: '#00DDEB', fontSize: '1.8rem' }} />
                  <ListItemText
                    primary={`${index + 1}. ${destination.name}`}
                    secondary={`Coordinates: (${destination.position.lat.toFixed(4)}, ${destination.position.lng.toFixed(4)})`}
                    primaryTypographyProps={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#ffffff',
                      fontSize: '1.1rem',
                    }}
                    secondaryTypographyProps={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default TripDetails;