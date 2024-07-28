import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from '../axios';

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    axios.get('/accommodations')
      .then((response) => {
        setAccommodations(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the accommodations!', error);
      });
  }, []);

  return (
    <Box>
      <Grid container spacing={4}>
        {accommodations.map((accommodation) => (
          <Grid item xs={12} sm={6} md={4} key={accommodation._id}>
            <Card sx={{ '&:hover': { transform: 'scale(1.05)' }, transition: '0.3s' }}>
              <CardMedia
                component="img"
                height="200"
                image={accommodation.image}
                alt={accommodation.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {accommodation.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Accommodations;
