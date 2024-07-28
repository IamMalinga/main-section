import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from '../axios';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('/offers')
      .then((response) => {
        setOffers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the offers!', error);
      });
  }, []);

  return (
    <Box>
      <Grid container spacing={4}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer._id}>
            <Card sx={{ '&:hover': { transform: 'scale(1.05)' }, transition: '0.3s' }}>
              <CardMedia
                component="img"
                height="200"
                image={offer.image}
                alt={offer.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {offer.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Offers;
