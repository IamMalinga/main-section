import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

// Custom theme with Poppins font
const theme = createTheme({
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    palette: {
      primary: {
        main: "#033363",
      },
      secondary: {
        main: "#FF6F61",
      },
      background: {
        default: "#F4F7FA",
      },
    },
  });
  
  // Styled components for a modern UI
  const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: "50px",
    padding: "12px 24px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  }));
  
  const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      fontSize: "16px",
      color: theme.palette.primary.main,
      fontWeight: "500",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  }));

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/profile-pictures%2Fassets%2Freset-password.png?alt=media&token=fd17d72e-46fa-49ee-a393-37b1fa85c176')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain", // Ensures the entire image is visible
            backgroundPosition: "center",
            padding: 2, // Add padding for better alignment
            overflow: "hidden", // Prevent any overflow issues
        }}
      >
        <Paper
        elevation={6}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: 4,
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Reset Password
          </Typography>
          <form onSubmit={handleResetPassword}>
            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Re-enter Password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Reset Password'}
            </StyledButton>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
