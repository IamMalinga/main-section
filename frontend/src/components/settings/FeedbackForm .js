import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Rating,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#033363',
    },
    secondary: {
      main: '#FF6F61',
    },
    background: {
      default: '#F4F7FA',
    },
  },
});

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

const FeedbackForm = () => {
  const { user } = useAuthContext();
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (e) => {
    e.preventDefault();
    if (!feedback || !category || !rating) {
      setError('All fields are required');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);
    setOpenDialog(false);

    try {
      const response = await fetch('/api/users/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ feedback, category, rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback.');
      }

      setFeedback('');
      setCategory('');
      setRating(0);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '85vh',
          bgcolor: '#F4F7FA',
          p: 2,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left Section - Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/profile-pictures%2Fassets%2Ffeedback.png?alt=media&token=b56f27af-ac7a-489d-ad80-f293b7152fa9"
                alt="Feedback Illustration"
                sx={{
                  maxWidth: '100%',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </Grid>

          {/* Right Section - Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 3,
                p: 4,
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#033363',
                  mb: 3,
                }}
              >
                <FeedbackIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Submit Your Feedback
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                  Feedback submitted successfully!
                </Alert>
              )}

              <form onSubmit={handleOpenDialog}>
                <TextField
                  label="Your Feedback"
                  placeholder="Write your feedback here..."
                  multiline
                  rows={4}
                  fullWidth
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    },
                  }}
                />

                <TextField
                  label="Category"
                  select
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    },
                  }}
                >
                  <MenuItem value="App">App</MenuItem>
                  <MenuItem value="Travel Guiders">Travel Guiders</MenuItem>
                  <MenuItem value="Open Chat">Open Chat</MenuItem>
                  <MenuItem value="Services">Services</MenuItem>
                </TextField>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography
                    variant="body1"
                    sx={{ mr: 2, fontWeight: 'bold', color: '#033363' }}
                  >
                    Rating:
                  </Typography>
                  <Rating
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    size="large"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#ffc107',
                      },
                    }}
                  />
                </Box>

                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                 
                  fullWidth
                  startIcon={<SendIcon />}
                  sx={{
                    borderRadius: 2,
                    background: '#033363',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      background: '#033363',
                    },
                  }}
                >
                  Submit Feedback
                </StyledButton>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '16px',
            background: 'linear-gradient(135deg, #ffffff, #f4f4f8)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#033363',
            fontSize: '1.25rem',
          }}
        >
          Confirm Submission
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center">
            Are you sure you want to submit your feedback?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{
              fontWeight: 'bold',
              borderRadius: '50px',
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 'bold',
              borderRadius: '50px',
              px: 3,
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default FeedbackForm;
