import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    CircularProgress,
} from '@mui/material';
import { DateRange } from 'react-date-range';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import GuestInfoForm from './GuestInfoForm';
import PaymentForm from './PaymentForm';

const HotelBookingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hotel] = useState(location.state?.hotel || null);
    const [loading, setLoading] = useState(!hotel);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDates, setSelectedDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [guestInfo, setGuestInfo] = useState({ fullName: '', email: '', phone: '' });
    const steps = ['Select Dates', 'Guest Information', 'Payment'];

    useEffect(() => {
        if (!hotel) navigate('/hotels');
        else setLoading(false);
    }, [hotel, navigate]);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleDateChange = (ranges) => {
        setSelectedDates({
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
        });
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );

    return (
        <Container>
            <Paper elevation={4} sx={{ p: 4, mt: 8, mb: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Book {hotel?.name}
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
                        <Typography variant="h6" align="center">
                            Select Your Dates
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 2,
                            }}
                        >
                            <DateRange
                                ranges={[
                                    {
                                        startDate: selectedDates.startDate,
                                        endDate: selectedDates.endDate,
                                        key: 'selection',
                                    },
                                ]}
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                editableDateInputs
                                locale={enUS}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    </Box>
                )}

                {activeStep === 1 && (
                    <GuestInfoForm
                        guestInfo={guestInfo}
                        setGuestInfo={setGuestInfo}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {activeStep === 2 && (
                    <PaymentForm
                        hotel={hotel}
                        selectedDates={selectedDates}
                        guestInfo={guestInfo}
                        onSubmit={() => {
                            alert('Payment Successful!');
                            navigate('/hotels');
                        }}
                        onBack={handleBack}
                    />
                )}
            </Paper>
        </Container>
    );
};

export default HotelBookingPage;