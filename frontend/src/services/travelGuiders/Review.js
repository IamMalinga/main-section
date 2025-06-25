import React from 'react';
import { Typography, TextField, Button, Rating, Paper, Box, List, Divider, Avatar } from '@mui/material';

const ReviewsSection = ({ reviews = [], onSubmitReview, reviewText, setReviewText, reviewRating, setReviewRating }) => {
    return (
        <Box sx={{ mt: 4 }}>
            {/* Display Existing Reviews */}
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Reviews
            </Typography>
            <List sx={{ padding: 0 }}>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                padding: 3,
                                mb: 3,
                                borderRadius: 3,
                                backgroundColor: '#f7f7f7',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                ':hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                position: 'relative',
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar sx={{ bgcolor: '#1a73e8', width: 48, height: 48, fontSize: '1.2rem' }}>
                                    {review.user ? review.user.firstName.charAt(0) : 'A'}
                                </Avatar>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{ color: '#333', textAlign: 'left' }}
                                    >
                                        {review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Anonymous'}
                                    </Typography>
                                    <Rating value={review.rating} readOnly size="small" />
                                </Box>
                            </Box>
                            <Typography
                                variant="body2"
                                fontWeight="medium"
                                sx={{
                                    background: '#fff',
                                    padding: 2,
                                    borderRadius: 2,
                                    borderLeft: '4px solid #1a73e8',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                    fontStyle: 'italic',
                                    lineHeight: 1.5,
                                    color: '#555',
                                }}
                            >
                                "{review.review}"
                            </Typography>
                            {index !== reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No reviews yet. Be the first to add one!
                    </Typography>
                )}
            </List>

            {/* Add a New Review Section */}
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                Add a Review
            </Typography>
            <Paper
                elevation={2}
                sx={{
                    padding: 3,
                    mt: 2,
                    borderRadius: 3,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
                }}
            >
                <TextField
                    label="Share your experience"
                    fullWidth
                    multiline
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Rating
                        value={reviewRating}
                        onChange={(e, newValue) => setReviewRating(newValue)}
                        precision={0.5}
                        sx={{ mr: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmitReview}
                        sx={{
                            px: 4,
                            borderRadius: 50,
                            fontWeight: 'bold',
                            transition: '0.3s',
                            backgroundColor: '#1a73e8',
                            ':hover': {
                                backgroundColor: '#0c66c2',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        Submit Review
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ReviewsSection;
