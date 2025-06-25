import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const GuestInfoForm = ({ guestInfo, onChange, onNext, onBack }) => {
    const [formData, setFormData] = useState(guestInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onChange(formData);
        onNext();
    };

    return (
        <Box>
            <Typography variant="h6">Guest Information</Typography>
            <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <Box sx={{ mt: 3 }}>
                <Button onClick={onBack} variant="outlined" color="secondary">
                    Back
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ ml: 2 }}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default GuestInfoForm;