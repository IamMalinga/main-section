import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAuthContext } from "../../authentication/hooks/useAuthContext";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
  

const ProfileSettings = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    bod: "",
    gender: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch user details");
        }
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          bod: data.bod ? new Date(data.bod).toISOString().split("T")[0] : "",
          gender: data.gender,
          profilePic: data.profilePic || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleOpenDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenDialog(false);
    setLoading(true);
    setMessage(null);
    setError(null);

    let profilePicUrl = profile.profilePic;

    if (profilePic) {
      const storageRef = ref(storage, `profile-pictures/${profilePic.name}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      try {
        profilePicUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Image upload failed:", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      } catch (error) {
        console.error("Failed to upload and get profile picture URL", error);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...profile, profilePic: profilePicUrl }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setMessage("Profile updated successfully!");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const navigateToFeedback = () => {
    navigate("/profile/feedback");
  };

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/profile-pictures%2Fassets%2Fprofile-pic.png?alt=media&token=1fabbdb6-0f62-4a6e-b684-ddfa265f9f36')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", // Ensures the entire image is visible
        backgroundPosition: "right",
        padding: 0, // Add padding for better alignment
        marginBottom: 2,
        overflow: "hidden", // Prevent any overflow issues
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "900px",
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Grid container spacing={2}>
        <Grid
  item
  xs={12}
  md={4}
  sx={{
    background: "linear-gradient(135deg, #061161, #0f9b8e)", // Modern gradient
    borderRadius: "16px", // Smooth rounded corners
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Elevated shadow
    padding: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <CardContent
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      color: "#ffffff", // White text for contrast
    }}
  >
    {/* Profile Avatar */}
    <Avatar
      src={profile.profilePic || "https://via.placeholder.com/150"}
      alt={`${profile.firstName} ${profile.lastName}`}
      sx={{
        width: 150,
        height: 150,
        border: "6px solid rgba(255, 255, 255, 0.8)", // Semi-transparent white border
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Slight shadow for emphasis
        transition: "transform 0.3s ease", // Animation for hover
        "&:hover": {
          transform: "scale(1.1)", // Scale effect on hover
        },
      }}
    />

    {/* Change Photo Button */}
    <Button
      component="label"
      variant="contained"
      sx={{
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent button
        color: "#033363", // Matching gradient primary color
        fontWeight: 600,
        borderRadius: "30px", // Rounded button
        padding: "10px 20px",
        textTransform: "none",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
        transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth hover effect
        "&:hover": {
          backgroundColor: "#e0f7fa",
          transform: "translateY(-3px)", // Lift effect on hover
        },
      }}
      startIcon={<CameraAltIcon />}
    >
      Change Photo
      <input
        hidden
        accept="image/*"
        type="file"
        onChange={handleProfilePicChange}
      />
    </Button>

    {/* Upload Progress */}
    {uploadProgress > 0 && (
      <LinearProgress
        variant="determinate"
        value={uploadProgress}
        sx={{
          width: "100%",
          height: 8,
          borderRadius: 5,
          backgroundColor: "#ffffff",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#033363",
          },
        }}
      />
    )}

    {/* Feedback Button */}
    <Button
      onClick={navigateToFeedback}
      startIcon={<FeedbackIcon />}
      variant="contained"
      sx={{
        background: "rgba(255, 255, 255, 0.9)", // Semi-transparent button
        color: "#FF4081", // Trendy pink for feedback
        fontWeight: 600,
        borderRadius: "30px",
        padding: "10px 20px",
        textTransform: "none",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        "&:hover": {
          backgroundColor: "#ffe0e6",
          transform: "translateY(-3px)",
        },
      }}
    >
      Give Feedback
    </Button>
  </CardContent>
</Grid>


          {/* Profile Editing Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Edit Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {loading ? (
              <CircularProgress />
            ) : (
              <form onSubmit={handleOpenDialog}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="bod"
                      type="date"
                      value={profile.bod}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Gender"
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Update Profile
                  </Button>
                </Box>
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {message}
                  </Alert>
                )}
              </form>
            )}
          </Grid>
        </Grid>
      </Card>
      <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  aria-labelledby="confirm-dialog-title"
  PaperProps={{
    sx: {
      borderRadius: "16px", // Rounded corners
      padding: "16px", // Inner padding
      background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Subtle gradient background
      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", // Elevated shadow
    },
  }}
>
  <DialogTitle
    id="confirm-dialog-title"
    sx={{
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "1.25rem",
      color: "#033363", // Primary color
    }}
  >
    Confirm Profile Update
  </DialogTitle>
  <DialogContent
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 2, // Spacing between elements
    }}
  >
    <Typography
      sx={{
        fontSize: "1rem",
        fontWeight: "500",
        color: "#4A4A4A",
      }}
    >
      Are you sure you want to save changes to your profile?
    </Typography>
    <Avatar
      src={profilePic} // Add your icon or placeholder
      alt="Confirmation Icon"
      sx={{
        width: 64,
        height: 64,
        background: "#000",
        borderRadius: "50%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    />
  </DialogContent>
  <DialogActions
    sx={{
      justifyContent: "center",
      gap: 2, // Spacing between buttons
      padding: "16px 24px", // Padding around buttons
    }}
  >
    <Button
      onClick={handleCloseDialog}
      color="secondary"
      startIcon={<SaveIcon />} // Add an icon for the Cancel button
      sx={{
        background: "#E0E0E0",
        color: "#333",
        fontWeight: "bold",
        borderRadius: "50px",
        padding: "8px 24px",
        textTransform: "none",
        "&:hover": {
          background: "#d6d6d6",
        },
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleSubmit}
      variant="contained"
      color="primary"
      startIcon={<SaveIcon />} // Add an icon for the Confirm button
      sx={{
        fontWeight: "bold",
        borderRadius: "50px",
        padding: "8px 24px",
        textTransform: "none",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          background: "#0056a3",
        },
      }}
    >
      Confirm
    </Button>
  </DialogActions>
</Dialog>

    </Box>
    </ThemeProvider>
  );
};

export default ProfileSettings;
