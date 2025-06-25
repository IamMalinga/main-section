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
import HotelIcon from "@mui/icons-material/Hotel";
import SearchIcon from "@mui/icons-material/Search";
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

const serviceItems = [
  {
    title: "Travel Guides Dashboard",
    description: "Manage and provide travel guiding services.",
    icon: <TravelExploreIcon fontSize="large" />,
    navigateTo: "/services/supplier/travel-guiders",
  },
  {
    title: "Vehicle Renters Dashboard",
    description: "Offer vehicle rentals for tourists.",
    icon: <DriveEtaIcon fontSize="large" />,
    navigateTo: "/vehicle-renters-dashboard",
  },
  {
    title: "Accommodation Dashboard",
    description: "Manage accommodations for travelers.",
    icon: <LocalHotelIcon fontSize="large" />,
    navigateTo: "/accommodation-dashboard",
  },
  {
    title: "Hotel Owners Dashboard",
    description: "List and manage your hotel's details and availability.",
    icon: <HotelIcon fontSize="large" />,
    navigateTo: "/hotel-owners-dashboard",
  },
  {
    title: "Find Lost Items Posters",
    description: "Post and manage posters for lost and found items.",
    icon: <SearchIcon fontSize="large" />,
    navigateTo: "/lost-items-dashboard",
  },
];

const SupplierDashboardHome = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/travelsri-e041e.firebasestorage.app/o/main%2Ffreelancer.png?alt=media&token=9d898b94-2b90-4184-9aba-324036c7fad3")`,
          backgroundSize: "fill",
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
            Add Your Services
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: theme.palette.text.secondary, mb: 4 }}
          >
            Are you looking to provide services? Choose the type of service you
            want to offer and manage everything from one place.
          </Typography>

          <Grid container spacing={4}>
            {serviceItems.map((item, index) => (
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

export default SupplierDashboardHome;
