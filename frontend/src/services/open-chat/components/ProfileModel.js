import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Modal,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import { fetchProfile, updateProfile, uploadImage, fetchMyPosts } from "../api";
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";
import Post from "./Post";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#011f4b",
    },
    secondary: {
      main: "#FF6F61",
    },
    background: {
      default: "#0a2742",
      paper: "#122840",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9dbcd4",
    },
  },
});

const style = {
  position: "absolute",
  top: "0%",
  right: "0%",
  width: "55vw",
  height: "100vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
};

const ProfileModal = ({ open, handleClose }) => {
  const { user } = useAuthContext();
  const userId = user?._id;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const profileData = await fetchProfile(userId);
          const userPosts = await fetchMyPosts(userId, user.token);
          setProfile(profileData);
          setPosts(userPosts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile or posts data:", error);
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, userId, user.token]);

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const folder = dialogType === "banner" ? "banners" : "profile-pics";
      const url = await uploadImage(selectedFile, userId, folder);
      const updatedProfile = await updateProfile(userId, {
        [dialogType]: url,
      });
      setProfile(updatedProfile);
      handleDialogClose();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleEditField = (fieldName, currentValue) => {
    setEditingField(fieldName);
    setFieldValue(currentValue);
  };

  const handleSaveField = async () => {
    try {
      const updatedProfile = await updateProfile(userId, { [editingField]: fieldValue });
      setProfile(updatedProfile);
      setEditingField(null);
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  if (loading) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CircularProgress sx={{ margin: "auto" }} />
        </Box>
      </Modal>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            {/* Header Section */}
            <Grid item xs={12}>
              <ProfileHeader
                profile={profile}
                onEditBanner={() => handleDialogOpen("banner")}
                onEditProfilePic={() => handleDialogOpen("profilePic")}
              />
            </Grid>

            <Grid item xs={5}>
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      color: theme.palette.text.primary,
      marginBottom: "16px",
      borderBottom: "2px solid",
      borderColor: theme.palette.primary.main,
      paddingBottom: "4px",
    }}
  >
    About Me
  </Typography>
  {[
    { label: "Email", field: "email", value: profile.email },
    { label: "Address", field: "address", value: profile.address },
    { label: "Gender", field: "gender", value: profile.gender },
    { label: "Date of Birth", field: "bod", value: profile.bod },
  ].map(({ label, field, value }) => (
    <Box
      key={field}
      sx={{
        marginBottom: "20px",
        padding: "12px 16px",
        backgroundColor: theme.palette.background.default,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
      >
        {label}
      </Typography>
      {editingField === field ? (
        <Box>
          <TextField
            fullWidth
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            sx={{
              marginTop: "10px",
              marginBottom: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: theme.palette.secondary.main,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              onClick={handleSaveField}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Save
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="outlined"
              sx={{
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                "&:hover": {
                  borderColor: theme.palette.secondary.dark,
                  color: theme.palette.secondary.dark,
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: value ? theme.palette.text.primary : theme.palette.text.secondary,
              fontStyle: value ? "normal" : "italic",
            }}
          >
            {value || "Not set"}
          </Typography>
          <Button
            onClick={() => handleEditField(field, value)}
            size="small"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Edit
          </Button>
        </Box>
      )}
    </Box>
  ))}
</Grid>

            <Grid item xs={7}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  marginBottom: "10px",
                }}
              >
                My Posts
              </Typography>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post key={post._id} post={post} sx={{ marginBottom: "10px" }} />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No posts available.
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* File Upload Dialog */}
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>
              Upload {dialogType === "banner" ? "Banner" : "Profile Picture"}
            </DialogTitle>
            <DialogContent>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "block", margin: "10px 0" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleUpload} variant="contained" disabled={!selectedFile}>
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ProfileModal;
