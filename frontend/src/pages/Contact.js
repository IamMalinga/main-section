import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      setSuccessDialogOpen(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending contact form:", error.message);
      alert("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 5 }}>
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: "24px",
            background: `linear-gradient(135deg, rgba(1, 31, 75, 0.9) 30%, rgba(10, 39, 66, 1) 100%)`,
            mb: 5,
            color: theme.palette.text.primary,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Contact Us
          </Typography>
          <Divider sx={{ my: 3, backgroundColor: theme.palette.secondary.main }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: theme.palette.text.primary }}
              >
                Get in Touch
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: theme.palette.secondary.main }} />
                  <Typography variant="body1">travelsri.com</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: theme.palette.secondary.main }} />
                  <Typography variant="body1">(081) 456-3456</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 2, color: theme.palette.secondary.main }} />
                  <Typography variant="body1">Kandy, Sri Lanka</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: theme.palette.text.primary }}
              >
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                    
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      variant="outlined"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      endIcon={<SendIcon />}
                      disabled={loading}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: "50px",
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>

        <Dialog
          open={successDialogOpen}
          onClose={() => setSuccessDialogOpen(false)}
        >
          <DialogTitle sx={{ color: theme.palette.primary.main }}>
            Message Sent
          </DialogTitle>
          <DialogContent>
            <Typography>
              Your message has been successfully sent to Travel Sri admin.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSuccessDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default ContactPage;
