import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const GuestInfoForm = ({ guestInfo, setGuestInfo, onNext, onBack }) => {
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]+$/;
        return phoneRegex.test(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGuestInfo((prev) => ({ ...prev, [name]: value }));

        if (value.trim()) {
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handleNext = () => {
        const currentErrors = {};

        if (!guestInfo.fullName || guestInfo.fullName.trim() === '') {
            currentErrors.fullName = 'Full Name is required.';
        }
        if (!guestInfo.email || !validateEmail(guestInfo.email)) {
            currentErrors.email = 'Enter a valid email address.';
        }
        if (!guestInfo.phone || !validatePhone(guestInfo.phone)) {
            currentErrors.phone = 'Phone number must contain only numbers.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        onNext();
    };

    return (
        <Box>
            <Typography variant="h6">Enter Guest Information</Typography>
            <Box mt={2}>
                <TextField
                    label="Full Name"
                    name="fullName"
                    required
                    value={guestInfo.fullName || ''}
                    onChange={handleChange}
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    required
                    value={guestInfo.email || ''}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone"
                    name="phone"
                    required
                    value={guestInfo.phone || ''}
                    onChange={handleChange}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    fullWidth
                    margin="normal"
                />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={onBack}>
                    Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default GuestInfoForm;


