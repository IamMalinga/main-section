import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from '../axios';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get('/destinations')
      .then((response) => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the destinations!', error);
      });
  }, []);

  return (
    <Box>
      <Grid container spacing={4}>
        {destinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination._id}>
            <Card sx={{ '&:hover': { transform: 'scale(1.05)' }, transition: '0.3s' }}>
              <CardMedia
                component="img"
                height="200"
                image={destination.image}
                alt={destination.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {destination.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Destinations;
