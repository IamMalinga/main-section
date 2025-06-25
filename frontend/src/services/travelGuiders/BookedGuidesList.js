import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, CircularProgress, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';

const BookedGuidesList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`/travel-guides/${user._id}/book`, {
                headers: {
                    'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();
            setBookings(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.token) {
            fetchBookings();
        }
    }, [user]);

    const handleCancelBooking = async () => {
        try {
            const response = await fetch(`/api/travel-guides/my-bookings/${selectedBookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            setBookings(bookings.filter((booking) => booking._id !== selectedBookingId));
            alert('Booking canceled successfully');
            setSelectedBookingId(null);
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (bookings.length === 0) {
        return <Typography>No bookings found.</Typography>;
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {bookings.map((booking) => (
                    <Grid item xs={12} md={6} key={booking._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{booking.guideId.name}</Typography>
                                <Typography>Location: {booking.guideId.location?.name || 'Unknown'}</Typography>
                                <Typography>Start Date: {new Date(booking.startDate).toLocaleDateString()}</Typography>
                                <Typography>End Date: {new Date(booking.endDate).toLocaleDateString()}</Typography>
                                <Typography>Total Price: ${booking.totalPrice}</Typography>
                                <Typography>Status: {booking.status}</Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setSelectedBookingId(booking._id)}
                                    sx={{ mt: 2 }}
                                    disabled={booking.status === 'cancelled' || new Date(booking.endDate) < new Date()}
                                >
                                    Cancel Booking
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={Boolean(selectedBookingId)}
                onClose={() => setSelectedBookingId(null)}
            >
                <DialogTitle>Are you sure you want to cancel this booking?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setSelectedBookingId(null)}>No</Button>
                    <Button color="error" onClick={handleCancelBooking}>
                        Yes, Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BookedGuidesList;
