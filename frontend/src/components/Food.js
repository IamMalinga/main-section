import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from '../axios';

const Food = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('/food')
      .then((response) => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the food items!', error);
      });
  }, []);

  return (
    <Box>
      <Grid container spacing={4}>
        {foods.map((food) => (
          <Grid item xs={12} sm={6} md={4} key={food._id}>
            <Card sx={{ '&:hover': { transform: 'scale(1.05)' }, transition: '0.3s' }}>
              <CardMedia
                component="img"
                height="200"
                image={food.image}
                alt={food.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {food.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {food.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Food;
