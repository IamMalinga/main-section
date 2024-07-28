import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import axios from '../axios';
import { styled } from '@mui/system';

const ReviewsWrapper = styled(Box)({
  display: 'flex',
  overflowX: 'scroll',
  padding: '1rem',
  '&::-webkit-scrollbar': {
    height: '0.4em',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1976d2',
    borderRadius: '10px',
  },
});

const ReviewCard = styled(Card)({
  minWidth: '300px',
  margin: '0 1rem',
});

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/reviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <ReviewsWrapper>
      {reviews.map(review => (
        <ReviewCard key={review._id}>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar sx={{ bgcolor: '#1976d2' }}>
                {review.name.charAt(0)}
              </Avatar>
            </Box>
            <Typography variant="h6" align="center">{review.name}</Typography>
            <Typography align="center">{review.comment}</Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              {[...Array(review.rating)].map((_, i) => (
                <Box key={i} sx={{ color: '#ffc107', marginRight: '2px' }}>★</Box>
              ))}
            </Box>
            <Typography variant="body2" align="center" color="textSecondary">{review.role}</Typography>
          </CardContent>
        </ReviewCard>
      ))}
    </ReviewsWrapper>
  );
};

export default Reviews;
