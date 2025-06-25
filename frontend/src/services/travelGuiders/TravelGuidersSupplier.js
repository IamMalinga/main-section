import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Container,
  Grid,
  Collapse,
  IconButton,
  Avatar,
  Paper,
  ImageList,
  ImageListItem,
  LinearProgress
} from "@mui/material";
import { useAuthContext } from "../../authentication/hooks/useAuthContext";
import SupplierStatus from "./components/SupplierStatus";
import BookingsList from "./components/BookingsList";
import RegistrationForm from "./components/RegistrationDialog";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { fetchUserData, fetchSupplierData, fetchSupplierBookingsData, registerSupplier, saveGalleryImages } from "./services/supplierService";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#011f4b',
    },
    secondary: {
      main: '#FF6F61',
    },
    background: {
      default: '#0a2742',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9dbcd4',
    },
  },
});

const TravelGuidersSupplier = () => {
  const { user } = useAuthContext();
  const [detailedUser, setDetailedUser] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [status, setStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [expandRegistrationForm, setExpandRegistrationForm] = useState(false);

  const [supplierData, setSupplierData] = useState({
    name: "",
    location: { name: "", lat: null, lng: null },
    bio: "",
    contact: "",
    pricePerDay: "",
    profilePic: "",
    experienceYears: "",
    languages: [],
    specialties: [],
  });

  const initializeData = async () => {
    setLoading(true);
    try {
      const userResponse = await fetch(`/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!userResponse.ok) throw new Error("Failed to fetch user details");
      const userData = await userResponse.json();
      setDetailedUser(userData);

      setSupplierData((prev) => ({
        ...prev,
        name: `${userData.firstName} ${userData.lastName}`,
        contact: userData.email,
      }));
      setGalleryImages(supplierData.experienceImages || []);
      const supplierInfo = await fetchSupplierBookingsData(user);
      const supplierFullData = await fetchSupplierData(user);

      setSupplier(supplierFullData);
      setBookings(supplierInfo.bookings);
      setStatus(supplierFullData.supplierStatus);
      console.log(supplierFullData.availability)

      if (supplierInfo.supplier) {
        setSupplierData({
          name: supplierInfo.supplier.name || `${userData.firstName} ${userData.lastName}`,
          location: supplierInfo.supplier.location || { name: "", lat: null, lng: null },
          bio: supplierInfo.supplier.bio || "",
          contact: supplierInfo.supplier.contact || userData.email,
          pricePerDay: supplierInfo.supplier.pricePerDay || "",
          profilePic: userData.profilePic,
          experienceYears: supplierInfo.supplier.experienceYears || "",
          languages: supplierInfo.supplier.languages?.join(", ") || "",
          specialties: supplierInfo.supplier.specialties?.join(", ") || "",
        });
      }
    } catch (error) {
      console.error("Error initializing data:", error);
    } finally {
      setLoading(false);
    }
  };




  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];
    const progress = {};

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `suppliers/${user._id}/gallery/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            progress[file.name] = percent;
            setUploadProgress({ ...progress });
          },
          (error) => {
            console.error("Upload error:", error);
            setSnackbar({ open: true, message: "Failed to upload images", severity: "error" });
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            uploadedUrls.push(url);
          }
        );
      }

      // Wait for all uploads to complete
      await Promise.all(Object.values(progress));

      // Save the URLs to the backend
      await saveGalleryImages(user, uploadedUrls);

      // Update the gallery state
      setGalleryImages((prev) => [...prev, ...uploadedUrls]);

      setSnackbar({ open: true, message: "Images uploaded successfully!", severity: "success" });
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };





  const handleRegisterSupplier = async () => {
    try {
      await registerSupplier(user, supplierData);
      setSnackbar({ open: true, message: "Registered as supplier!", severity: "success" });
      setExpandRegistrationForm(false);
      initializeData();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to register as supplier", severity: "error" });
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Box sx={{ py: 5 }}>
      <Paper
  elevation={4}
  sx={{
    p: 5,
    mb: 4,
    textAlign: "center",
    borderRadius: "16px",
    backgroundColor: "background.default",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    color: "text.primary",
  }}
>
  <Avatar
    alt={detailedUser?.firstName}
    src={detailedUser?.profilePic}
    sx={{
      width: 120,
      height: 120,
      margin: "0 auto",
      mb: 3,
      border: "4px solid",
      borderColor: "primary.main",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    }}
  />
  <Typography
    variant="h4"
    sx={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: "bold",
      color: 'text.primary',
      textTransform: "uppercase",
      mb: 1,
    }}
  >
    Travel Guiders' Dashboard
  </Typography>
  {detailedUser && (
    <Typography
      variant="h6"
      sx={{
        fontFamily: "Poppins, sans-serif",
        color: "text.secondary",
        mt: 1,
      }}
    >
      Welcome,{" "}
      <span
        style={{
          color: "primary.main",
          fontWeight: "bold",
        }}
      >
        {detailedUser.firstName} {detailedUser.lastName}
      </span>
    </Typography>
  )}
  <Typography
    variant="body1"
    sx={{
      fontFamily: "Poppins, sans-serif",
      color: "text.secondary",
      mt: 2,
      fontStyle: "italic",
    }}
  >
    Your dashboard for managing bookings, profiles, and more!
  </Typography>
</Paper>



        {!supplier && (
          <Box>
            {!expandRegistrationForm ? (
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    fontFamily: "Poppins, sans-serif",
                    background: "#1a73e8",
                    ":hover": { backgroundColor: "#1565c0" },
                  }}
                  onClick={() => setExpandRegistrationForm(true)}
                >
                  Become a Supplier
                </Button>
              </Box>
            ) : (
              <Collapse in={expandRegistrationForm}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#f9f9f9",
                    mt: 4,
                    position: "relative",
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={() => setExpandRegistrationForm(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <RegistrationForm
                    supplierData={supplierData}
                    setSupplierData={setSupplierData}
                    detailedUser={detailedUser}
                    onSubmit={handleRegisterSupplier}
                  />
                </Box>
              </Collapse>
            )}
          </Box>
        )}

        {supplier && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
            <Grid item xs={12} md={12}>
            <SupplierStatus status={status} setStatus={setStatus} user={user} />
            </Grid>
            <Grid item xs={12} md={12}>
            <SupplierStatus status={status} setStatus={setStatus} user={user} />
            </Grid>
            <Grid item xs={12} md={12}>
            <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              color: "#1a73e8",
              mb: 2,
            }}
          >
           
          </Typography>
          <ImageList cols={3} gap={10}>
            {galleryImages.map((image, index) => (
              <ImageListItem key={index}>
                <img src={image} alt={`Experience ${index + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
          <Box
            sx={{
              mt: 4,
              border: "2px dashed #1a73e8",
              p: 3,
              textAlign: "center",
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: "#1a73e8",
              }}
            >
              Upload Your Experience Images
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#1a73e8",
                mt: 2,
                ":hover": { backgroundColor: "#1565c0" },
              }}
            >
              Browse Files
              <input type="file" accept="image/*" hidden multiple onChange={handleImageUpload} />
            </Button>
            {Object.keys(uploadProgress).map((fileName) => (
              <Box key={fileName} sx={{ mt: 2, textAlign: "left" }}>
                <Typography variant="body2" sx={{ fontFamily: "Poppins, sans-serif" }}>
                  {fileName} - {uploadProgress[fileName]}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress[fileName]}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Box>
        </Box>
            </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
            <BookingsList bookings={bookings} refreshData={initializeData} user={user} />
            </Grid>
            
          </Grid>
        )}



 

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default TravelGuidersSupplier;
