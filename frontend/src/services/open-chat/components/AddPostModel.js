import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Tooltip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";
import { uploadImage, createPost } from "../api";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

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
    },
    text: {
      primary: "#ffffff",
      secondary: "#9dbcd4",
    },
  },
});

const AddPostModel = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const autocompleteRef = useRef(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        setLocation({
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error("Place geometry is not available.");
      }
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Please add some content to your post.");
      return;
    }

    if (!location) {
      alert("Please select a valid location.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, user.token);
      }

      const newPost = {
        content,
        image: imageUrl,
        location,
        userId: user._id,
      };

      const response = await createPost(newPost, user.token);

      if (response) {
        setContent("");
        setImage(null);
        setLocation(null);
        navigate("/services/open-chat");
      } else {
        console.error("Error creating post:", response.error);
        alert("Failed to create the post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          bgcolor: theme.palette.background.default,
          p: 4,
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Card
            sx={{
              width: "100%",
              maxWidth: 600,
              margin: "20px auto",
              padding: 2,
              borderRadius: 3,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
              bgcolor: '#21374e',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textAlign: "center",
                }}
              >
                Share your thoughts
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Write something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Tooltip title="Upload Image">
                  <IconButton color="primary" component="label">
                    <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
                {image && (
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, color: theme.palette.text.secondary }}
                  >
                    Image selected
                  </Typography>
                )}
                <Tooltip title="Add Emoji">
                  <IconButton color="primary" sx={{ marginLeft: 1 }}>
                    <EmojiEmotionsIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {image && (
                <Box
                  component="img"
                  src={image}
                  alt="Post Image"
                  sx={{
                    width: "100%",
                    marginTop: 2,
                    borderRadius: "12px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  }}
                />
              )}

              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Enter a location"
                  sx={{
                    mt: 2,
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              </Autocomplete>

              {location && location.name && (
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    color: theme.palette.text.secondary,
                    fontStyle: "italic",
                  }}
                >
                  Selected Location: {location.name}
                </Typography>
              )}
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  width: "48%",
                }}
              >
                Post
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setContent("");
                  setImage(null);
                  setLocation(null);
                }}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  width: "48%",
                }}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AddPostModel;
