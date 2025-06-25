import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    background: {
      default: 'black',
    },
    text: {
      primary: '#FFFFFF', // White text for dark background
      secondary: '#BBBBBB', // Light gray for secondary text
    },
  },
});

const services = [
  { name: 'Vehicle Hire', icon: '🚗', path: '/services/vehicle-hire' },
  { name: 'Weather Details', icon: '🌤️', path: '/services/weather' },
  { name: 'Open Chat', icon: '💬', path: '/services/open-chat' },
  { name: 'Travel Guiders', icon: '🗺️', path: '/services/travel-guiders' },
];

const Services = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleServiceClick = async (service) => {
    try {
      await axios.post(
        '/api/recent-service',
        {
          userId: user._id,
          serviceName: service.name,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate(service.path);
    } catch (error) {
      console.error('Error saving recent service:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: '24px' }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: '32px',
            fontWeight: 'bold',
            color: '#1976D2',
            textAlign: 'center',
          }}
        >
          Explore Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  borderRadius: '16px',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000', // Black background
                  color: '#FFFFFF', // White text
                  boxShadow: '0 8px 24px rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    boxShadow: '0 16px 32px rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-8px)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleServiceClick(service)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h2"
                      sx={{
                        marginBottom: '16px',
                        color: '#FFDF00', // Golden color for icons
                        fontSize: '3rem',
                      }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'medium',
                        fontSize: '1.1rem',
                        color: '#BBBBBB', // Light gray for service name
                      }}
                    >
                      {service.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Services;
