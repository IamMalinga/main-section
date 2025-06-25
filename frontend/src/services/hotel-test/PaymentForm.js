import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const PaymentForm = ({ paymentInfo, onSubmit, onBack }) => {
    const [formData, setFormData] = useState(paymentInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePayment = () => {
        // Here you would process the payment
        onSubmit(formData);
    };

    return (
        <Box>
            <Typography variant="h6">Payment Details</Typography>
            <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <TextField
                fullWidth
                label="Expiration Date"
                name="expDate"
                value={formData.expDate || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <TextField
                fullWidth
                label="CVV"
                name="cvv"
                value={formData.cvv || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <TextField
                fullWidth
                label="Cardholder Name"
                name="cardHolderName"
                value={formData.cardHolderName || ''}
                onChange={handleChange}
                sx={{ mt: 2 }}
            />
            <Box sx={{ mt: 3 }}>
                <Button onClick={onBack} variant="outlined" color="secondary">
                    Back
                </Button>
                <Button onClick={handlePayment} variant="contained" color="primary" sx={{ ml: 2 }}>
                    Pay Now
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentForm;