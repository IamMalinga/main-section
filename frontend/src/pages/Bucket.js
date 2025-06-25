import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
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

const bookingItems = [
  {
    title: "Travel Guides Booking",
    description: "View and manage your travel guide bookings.",
    icon: <TravelExploreIcon fontSize="large" />,
    navigateTo: "/services/travel-guide-bookings",
  },
  {
    title: "Vehicle Rentals Booking",
    description: "Track and manage your vehicle rental bookings.",
    icon: <DriveEtaIcon fontSize="large" />,
    navigateTo: "/vehicle-rental-bookings",
  },
  {
    title: "Accommodation Booking",
    description: "Check the status of your accommodation bookings.",
    icon: <LocalHotelIcon fontSize="large" />,
    navigateTo: "/accommodation-bookings",
  },
  {
    title: "All Booking Receipts",
    description: "View all your booking receipts in one place.",
    icon: <ReceiptLongIcon fontSize="large" />,
    navigateTo: "/booking-receipts",
  },
];

const UserBookingsDashboard = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/main%2Fserviceused.png?alt=media&token=92d1e67f-491c-456a-b9db-6f07a375dc06")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            width: "100%",
            backgroundColor: "rgba(10, 39, 66, 0.85)",
            borderRadius: 4,
            padding: 4,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          >
            Your Bookings
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: theme.palette.text.secondary, mb: 4 }}
          >
            Track the status of all your bookings and manage them from here.
          </Typography>

          <Grid container spacing={4}>
            {bookingItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(item.navigateTo)}
                    sx={{
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        width: 60,
                        height: 60,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserBookingsDashboard;
