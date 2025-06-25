import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const PaymentForm = ({ guide, bookingDates }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleCardNumberChange = (e) => setCardNumber(e.target.value);
    const handleCvvChange = (e) => setCvv(e.target.value);
    const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Payment processed successfully!');
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">Payment Information</Typography>
            <TextField
                label="Card Number"
                fullWidth
                margin="normal"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
            />
            <TextField
                label="CVV"
                fullWidth
                margin="normal"
                value={cvv}
                onChange={handleCvvChange}
                required
            />
            <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                margin="normal"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                required
            />
            <Button variant="contained" color="primary" type="submit">
                Confirm Payment
            </Button>
        </Box>
    );
};

export default PaymentForm;
