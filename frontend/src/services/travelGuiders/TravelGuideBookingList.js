import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Avatar,
  Stack,
  Chip,
  TextField,
  Button,
  Rating,
  Drawer,
  IconButton,
} from '@mui/material';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import NotificationList from '../../services/notification/components/NotificationList';
import NotificationBadge from '../../services/notification/components/NotificationBadge';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion'; // For animations
import NotificationsIcon from '@mui/icons-material/Notifications';

const TravelGuideBookingsList = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewState, setReviewState] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = user._id;
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected to backend with ID:', socket.id);
      socket.emit('joinRoom', userId);
    });

    socket.on('notification', (data) => {
      console.log('Real-time notification received:', data);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected from backend');
    });

    return () => {
      socket.off('connect');
      socket.off('notification');
      socket.off('disconnect');
    };
  }, [socket, userId]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await fetch('/api/travel-guides/bookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user]);

  const handleReviewSubmit = async (bookingId, guideId) => {
    const { review, rating } = reviewState[bookingId] || {};

    if (!review || !rating) {
      alert('Please provide both a review and a rating.');
      return;
    }

    try {
      const response = await fetch(`/api/travel-guides/${guideId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ review, rating }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      alert('Review submitted successfully!');
      setReviewState((prevState) => ({
        ...prevState,
        [bookingId]: { review: '', rating: 0 },
      }));

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, hasReviewed: true } : booking
        )
      );
    } catch (error) {
      console.error('Error submitting review:', error.message);
      alert('Failed to submit review. Please try again later.');
    }
  };

  const handleReviewChange = (bookingId, field, value) => {
    setReviewState((prevState) => ({
      ...prevState,
      [bookingId]: {
        ...prevState[bookingId],
        [field]: value,
      },
    }));
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress sx={{ color: '#7C4DFF' }} />
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <Typography
        variant="h6"
        textAlign="center"
        mt={5}
        sx={{ fontFamily: 'Inter, sans-serif', color: '#ffffff', fontWeight: 500 }}
      >
        No adventures booked yet. Start exploring!
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt: 0,
        px: { xs: 2, md: 4 },
        background: 'linear-gradient(135deg, #1E1E2F 0%, #2A2A4A 100%)',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          mb: 4,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.5px',
        }}
      >
        Your Travel Adventures
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <IconButton onClick={toggleDrawer(true)} sx={{ color: '#ffffff' }}>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={booking.guide?.profilePic || 'default-profile.jpg'}
                  alt={booking.guide?.name || 'Guide'}
                  sx={{
                    width: 64,
                    height: 64,
                    border: '2px solid #7C4DFF',
                    boxShadow: '0 0 10px rgba(124, 77, 255, 0.5)',
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    {booking.guide?.name || 'Travel Guide'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {booking.startDate
                      ? `From: ${new Date(booking.startDate).toLocaleDateString()}`
                      : 'Start date not available'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {booking.endDate
                      ? `To: ${new Date(booking.endDate).toLocaleDateString()}`
                      : 'End date not available'}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    color: '#ffffff',
                  }}
                >
                  Status:
                </Typography>
                <Chip
                  label={booking.status || 'Unknown'}
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    background:
                      booking.status === 'confirmed'
                        ? 'linear-gradient(45deg, #4CAF50, #81C784)'
                        : booking.status === 'pending'
                        ? 'linear-gradient(45deg, #FFB300, #FFCA28)'
                        : booking.status === 'cancelled'
                        ? 'linear-gradient(45deg, #F44336, #E57373)'
                        : '#757575',
                    color: '#ffffff',
                    borderRadius: '12px',
                  }}
                />
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                Total Price: ${booking.totalPrice || 0}
              </Typography>

              {booking.guideStatus === 'completed' && !booking.hasReviewed && (
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    Share Your Experience
                  </Typography>
                  <TextField
                    placeholder="Write your review"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      mt: 1,
                      mb: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& .MuiInputBase-input': {
                        color: '#ffffff',
                        fontFamily: 'Inter, sans-serif',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                    value={reviewState[booking._id]?.review || ''}
                    onChange={(e) =>
                      handleReviewChange(booking._id, 'review', e.target.value)
                    }
                  />
                  <Rating
                    value={reviewState[booking._id]?.rating || 0}
                    onChange={(e, newValue) =>
                      handleReviewChange(booking._id, 'rating', newValue)
                    }
                    precision={0.5}
                    sx={{
                      mb: 2,
                      color: '#FFD700',
                      '& .MuiRating-icon': {
                        color: 'rgba(255, 215, 0, 0.5)',
                      },
                      '& .MuiRating-iconFilled': {
                        color: '#FFD700',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleReviewSubmit(booking._id, booking.guideId?._id)}
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #7C4DFF, #B388FF)',
                      borderRadius: '12px',
                      textTransform: 'none',
                      padding: '8px 16px',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5E35B1, #9575CD)',
                        boxShadow: '0 4px 12px rgba(124, 77, 255, 0.3)',
                      },
                    }}
                  >
                    Submit Review
                  </Button>
                </Box>
              )}
            </Paper>
          </motion.div>
        ))}
      </Stack>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1E1E2F 0%, #2A2A4A 100%)',
            width: 350,
            p: 3,
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            color: '#ffffff',
            mb: 2,
          }}
        >
          Notifications
        </Typography>
        <NotificationList userId={userId} />
      </Drawer>
    </Box>
  );
};

export default TravelGuideBookingsList;