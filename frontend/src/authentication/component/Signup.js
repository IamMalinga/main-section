import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, CircularProgress, MenuItem, LinearProgress, IconButton, InputAdornment } from "@mui/material";
import { storage } from '../../config/firebaseConfig'; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#033363',
        },
    },
});

export default function SignUp() {
    const { signup, error, isLoading } = useSignup();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [address, setAddress] = useState('');
    const [bod, setBod] = useState('');
    const [gender, setGender] = useState('');
    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let profilePicUrl = '';

        if (profilePic) {
            const storageRef = ref(storage, `profile-pictures/${profilePic.name}`);
            const uploadTask = uploadBytesResumable(storageRef, profilePic);

            try {
                profilePicUrl = await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setUploadProgress(progress); // Update progress
                        },
                        (error) => {
                            console.error("Image upload failed:", error);
                            reject(error);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log("Profile picture available at:", downloadURL);
                            resolve(downloadURL);
                        }
                    );
                });
            } catch (error) {
                console.error("Failed to upload and get profile picture URL", error);
            }
        }

        const response = await signup(firstName, lastName, email, address, bod, gender, password, profilePicUrl);

        if (response) {
            setMessage(response.message);
            navigate('/verify', { state: { email } });
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 8 }}>
                <CssBaseline />
                <Grid container spacing={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            backgroundImage: 'url(./assets/signup.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            padding: 8,
                            width: '100vw'
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 4,
                            bgcolor: '#f7f7f7',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            {message ? (
                                <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>
                            ) : (
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="firstName"
                                                required
                                                fullWidth
                                                label="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Address"
                                                name="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Date of Birth"
                                                name="bod"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                value={bod}
                                                onChange={(e) => setBod(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                required
                                                fullWidth
                                                label="Gender"
                                                name="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={togglePasswordVisibility}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                fullWidth
                                            >
                                                Upload Profile Picture
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={handleProfilePicChange}
                                                />
                                            </Button>
                                            {uploadProgress > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    <LinearProgress variant="determinate" value={uploadProgress} />
                                                    <Typography variant="body2" color="textSecondary" align="center">
                                                        {uploadProgress}% uploaded
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                                    </Button>
                                    {error && <Alert severity="error" variant="outlined" sx={{ mt: 1 }}>{error}</Alert>}
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link component={RouterLink} to="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
