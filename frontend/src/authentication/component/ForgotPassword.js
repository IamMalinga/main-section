import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess("Password reset email sent successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
<Box
  sx={{
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url('https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/profile-pictures%2Fassets%2Fforgot-password.png?alt=media&token=f5296b4f-ede3-4776-b501-d6d54488f3ff')",
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
            padding: 4,
            borderRadius: "16px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ mb: 3, color: "#0077FF" }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "#555", fontSize: "14px" }}
          >
            Enter your email address below, and we’ll send you instructions to
            reset your password.
          </Typography>
          <form onSubmit={handleForgotPassword}>
            <StyledTextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Send Reset Link"
              )}
            </StyledButton>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
