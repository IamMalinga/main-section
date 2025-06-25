import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Button, Stepper, Step, StepLabel, Paper, CircularProgress } from '@mui/material';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import GuestInfoForm from './GuestInfoForm';
import PaymentForm from './PaymentForm';

const steps = ['Select Dates', 'Guest Information', 'Payment'];

const HotelBookingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hotel, setHotel] = useState(location.state?.hotel);
    const [loading, setLoading] = useState(!hotel);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
    const [guestInfo, setGuestInfo] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        if (!hotel) {
            console.error('Hotel data not available');
            navigate('/services/hotels'); // Redirect to the hotel list if hotel data is not available
        }
    }, [hotel, navigate]);

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleDateChange = (dates) => setSelectedDates(dates);

    const handleGuestInfoChange = (info) => setGuestInfo(info);

    const handlePaymentSubmit = (paymentData) => {
        setPaymentInfo(paymentData);
        // Here you would send the booking details to the backend
        console.log('Booking Details:', {
            hotelId: hotel._id,
            dates: selectedDates,
            guestInfo,
            paymentInfo: paymentData,
        });
    };

    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Book {hotel.name}
                </Typography>
                <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (
                    <Box>
                        <Typography variant="h6">Select Your Dates</Typography>
                        <DateRangePicker
                            onChange={handleDateChange}
                            value={selectedDates}
                        />
                        <Box sx={{ mt: 3 }}>
                            <Button onClick={handleNext} variant="contained" color="primary">
                                Next
                            </Button>
                        </Box>
                    </Box>
                )}

                {activeStep === 1 && (
                    <GuestInfoForm
                        guestInfo={guestInfo}
                        onChange={handleGuestInfoChange}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}

                {activeStep === 2 && (
                    <PaymentForm
                        paymentInfo={paymentInfo}
                        onSubmit={handlePaymentSubmit}
                        onBack={handleBack}
                    />
                )}
            </Paper>
        </Container>
    );
};

export default HotelBookingPage;