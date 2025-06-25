import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const PaymentForm = ({ hotel, selectedDates, guestInfo, onBack }) => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const validateCardNumber = (number) => /^\d{16}$/.test(number);
    const validateExpiryDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
    const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));

        if (value.trim()) {
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handlePaymentSubmit = () => {
        const { cardNumber, cardHolderName, expiryDate, cvv } = paymentDetails;
        const currentErrors = {};

        if (!cardNumber || !validateCardNumber(cardNumber)) {
            currentErrors.cardNumber = 'Card number must be a 16-digit number.';
        }
        if (!cardHolderName || cardHolderName.trim() === '') {
            currentErrors.cardHolderName = 'Card holder name is required.';
        }
        if (!expiryDate || !validateExpiryDate(expiryDate)) {
            currentErrors.expiryDate = 'Expiry date must be in MM/YY format.';
        }
        if (!cvv || !validateCVV(cvv)) {
            currentErrors.cvv = 'CVV must be a 3 or 4-digit number.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        console.log('Payment details:', paymentDetails);
        console.log('Hotel:', hotel);
        console.log('Selected Dates:', selectedDates);
        console.log('Guest Info:', guestInfo);

        setOpenSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        navigate('/hotels');
    };

    return (
        <Box>
            <Typography variant="h6">Payment Details</Typography>
            <Box mt={2}>
                <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                    error={Boolean(errors.cardNumber)}
                    helperText={errors.cardNumber}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Card Holder Name"
                    name="cardHolderName"
                    value={paymentDetails.cardHolderName}
                    onChange={handleChange}
                    error={Boolean(errors.cardHolderName)}
                    helperText={errors.cardHolderName}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Expiry Date (MM/YY)"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    error={Boolean(errors.expiryDate)}
                    helperText={errors.expiryDate}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="CVV"
                    name="cvv"
                    type="password"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    error={Boolean(errors.cvv)}
                    helperText={errors.cvv}
                    fullWidth
                    margin="normal"
                />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={onBack}>
                    Back
                </Button>
                <Button variant="contained" onClick={handlePaymentSubmit}>
                    Submit Payment
                </Button>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Payment Successful!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PaymentForm;
