import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Snackbar,
  IconButton
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Custom theme with Poppins font and enhanced color palette
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0077FF',
    },
    secondary: {
      main: '#FF6F61',
    },
    background: {
      default: '#F4F7FA',
    },
  },
});

// Styled components for modern visuals
const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '50px',
  padding: '12px 24px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(''));
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // For alert dialog
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar for feedback

  const { email, expired } = location.state || {};

  useEffect(() => {
    if (expired) {
      setSnackbarOpen(true);
    }
  }, [expired]);

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0 && !expired) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setDialogOpen(true); // Open dialog when countdown reaches 0
    }
  }, [countdown]);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1); // Ensure only one character is entered
    if (!/^\d$/.test(value) && value !== '') return; // Allow only numeric inputs
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const verificationCode = code.join(''); // Combine the digits into a single string
      const response = await fetch('/api/users/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    setError(null);

    try {
      const response = await fetch('/api/users/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
     
      setCountdown(180); // Reset countdown
      setDialogOpen(false); // Close the dialog if open
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
          padding: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: '20px',
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="700" sx={{ mb: 2 }}>
            Verify Your Email
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Enter the 6-digit code sent to your email: <strong>{email}</strong>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={1}>
              {code.map((digit, index) => (
                <StyledTextField
                  key={index}
                  id={`digit-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: { width: '50px', height: '50px' },
                  }}
                />
              ))}
            </Stack>

            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ width: '100%' }}>
                Email verified successfully!
              </Alert>
            )}

            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Verify'}
            </StyledButton>

            <StyledButton
              onClick={resendCode}
              variant="outlined"
              color="secondary"
              disabled={isResending || countdown > 0}
            >
              {countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend Code'}
            </StyledButton>
          </Box>
        </Paper>

{/* Modernized Dialog for Resend Code */}
<Dialog
  open={dialogOpen}
  onClose={handleDialogClose}
  PaperProps={{
    style: { borderRadius: '16px', padding: '16px' },
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '8px 16px' }}>
    <ErrorOutlineIcon color="warning" fontSize="large" />
    <DialogTitle sx={{ fontWeight: 'bold', flex: 1, padding: 0 }}>Resend Verification Code</DialogTitle>
    <IconButton onClick={handleDialogClose} size="small">
      <CloseIcon />
    </IconButton>
  </Box>

  <DialogContent>
    <DialogContentText sx={{ fontSize: '16px', color: '#555', textAlign: 'center' }}>
      Your verification code has expired. Would you like to resend the code to your email?
    </DialogContentText>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
    <Button
      onClick={handleDialogClose}
      variant="outlined"
      color="secondary"
      startIcon={<CloseIcon />}
      sx={{
        textTransform: 'none',
        padding: '8px 16px',
        borderRadius: '50px',
        fontWeight: 'bold',
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={resendCode}
      variant="contained"
      color="primary"
      startIcon={<RefreshIcon />}
      sx={{
        textTransform: 'none',
        padding: '8px 16px',
        borderRadius: '50px',
        fontWeight: 'bold',
      }}
    >
      Resend Code
    </Button>
  </DialogActions>
</Dialog>

      {/* Snackbar for Expired Code Alert */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message="Your verification code has expired. Please request a new code."
        />

      </Box>
    </ThemeProvider>
  );
}
