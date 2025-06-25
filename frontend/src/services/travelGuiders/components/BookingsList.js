import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  MenuItem,
  Select,
  CircularProgress,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import {
  approveBooking,
  cancelBooking,
  updateGuideStatus,
} from "../services/bookingService";

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

const BookingsList = ({ bookings, refreshData, user }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleApproveBooking = async (bookingId) => {
    try {
      await approveBooking(user, bookingId);
      refreshData();
    } catch (error) {
      console.error("Failed to approve booking:", error);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      await cancelBooking(user, selectedBooking);
      refreshData();
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  const handleGuideStatusChange = async (bookingId, newStatus) => {
    try {
      await updateGuideStatus(user, bookingId, newStatus);
      refreshData();
    } catch (error) {
      console.error("Failed to update guide status:", error);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "60vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <Paper
      sx={{
        p: 4,
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: 'background.default',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1a73e8",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Manage Bookings
      </Typography>
      {bookings?.length > 0 ? (
  bookings.map((booking) => (
    <Box
      key={booking._id}
      sx={{
        mb: 4,
        p: 1,
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#f9f9f9",
      }}
    >
      <Grid container spacing={4} sx={{ padding: 0 }}>
        {/* Left Section: User and Booking Details */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              borderRadius: 4,
              padding: 3,
            }}
          >
            {/* User Info */}
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                src={booking?.userId?.profilePic || "/default-avatar.jpg"}
                alt={booking?.userId?.firstName || "User"}
                sx={{
                  width: 50,
                  height: 50,
                  border: "4px solid #1a73e8",
                  mr: 3,
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "500",
                    color: "#1a73e8",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`${booking?.userId?.firstName || ""} ${
                    booking?.userId?.lastName || ""
                  }`}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#6c757d",
                    fontFamily: "Poppins, sans-serif",
                    mt: 1,
                  }}
                >
                  <PersonIcon
                    sx={{
                      fontSize: 15,
                      verticalAlign: "middle",
                      mr: 1,
                      color: "#1a73e8",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "150px",
                    }}
                    title={booking?.userId?.email || "N/A"}
                  >
                    {booking?.userId?.email || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Booking Details */}
            <Table
              sx={{
                minWidth: 300,
                overflow: "hidden",
              }}
            >
              <TableBody>
                {[
                  {
                    label: "Start Date",
                    value: booking.startDate
                      ? new Date(booking.startDate).toLocaleDateString()
                      : "N/A",
                    icon: <EventIcon sx={{ fontSize: 20, color: "#1a73e8" }} />,
                  },
                  {
                    label: "End Date",
                    value: booking.endDate
                      ? new Date(booking.endDate).toLocaleDateString()
                      : "N/A",
                    icon: <EventIcon sx={{ fontSize: 20, color: "#1a73e8" }} />,
                  },
                  {
                    label: "Status",
                    value: booking.status || "N/A",
                    icon: <CheckCircleIcon sx={{ fontSize: 20 }} />,
                    color:
                      booking.status === "confirmed" ? "green" : "#f0ad4e",
                  },
                  {
                    label: "Payment",
                    value: booking.paymentStatus || "N/A",
                    icon: <PaymentIcon sx={{ fontSize: 20 }} />,
                    color:
                      booking.paymentStatus === "paid"
                        ? "green"
                        : "#d9534f",
                  },
                ].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #eaeaea",
                      }}
                    >
                      {item.icon}
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "bold",
                          color: "#444",
                          ml: 1,
                        }}
                      >
                        {item.label}:
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "right",
                        borderBottom: "1px solid #eaeaea",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          color: item.color || "#444",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>

        {/* Right Section: Actions */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              borderRadius: 4,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: "#1a73e8",
                textAlign: "center",
              }}
            >
              Manage Approval
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              flexWrap="wrap"
              gap={2}
            >
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg, #28a745, #34d058)",
                  color: "#ffffff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  boxShadow: "0 6px 12px rgba(40, 167, 69, 0.3)",
                  width: "120px",
                  height: "45px",
                  textTransform: "none",
                }}
                startIcon={<CheckCircleIcon />}
                onClick={() => handleApproveBooking(booking._id)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg, #dc3545, #f0505a)",
                  color: "#ffffff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  boxShadow: "0 6px 12px rgba(220, 53, 69, 0.3)",
                  width: "120px",
                  height: "45px",
                  textTransform: "none",
                }}
                startIcon={<CancelIcon />}
                onClick={() => {
                  setDialogOpen(true);
                  setSelectedBooking(booking._id);
                }}
              >
                Cancel
              </Button>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: "#1a73e8",
                textAlign: "center",
              }}
            >
              Update Trip Status
            </Typography>
            <Select
              value={booking.guideStatus || "pending"}
              onChange={(e) =>
                handleGuideStatusChange(booking._id, e.target.value)
              }
              sx={{
                width: "100%",
                maxWidth: "300px",
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                color: "#000",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                "& .MuiSelect-icon": {
                  color: "#000",
                },
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="started">Started</MenuItem>
              <MenuItem value="ongoing">Ongoing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ))
) : (
  <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
    No bookings available.
  </Typography>
)}



      {/* Dialog for canceling booking */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            No
          </Button>
          <Button
            onClick={handleCancelBooking}
            color="error"
            sx={{ fontFamily: "Poppins, sans-serif" }}
            autoFocus
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    </ThemeProvider>
  );
};

export default BookingsList;
