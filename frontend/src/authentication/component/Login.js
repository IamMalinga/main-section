import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { Alert, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

export default function Login() {
    const { login, error, isLoading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password);
    };

    if (user) {
        return <Navigate to="/" replace />;
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CssBaseline />
                <Grid container spacing={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            backgroundImage: 'url(./assets/login.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
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
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            background: 'white',
                                            borderRadius: 1,
                                        },
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password" }
                                    value={password}
                                    InputProps={{ endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ) }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            background: 'white',
                                            borderRadius: 1,
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        fontWeight: 700,
                                        backgroundColor: '#033363',
                                        '&:hover': {
                                            backgroundColor: '#0056b3',
                                        },
                                        borderRadius: '50px',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                                </Button>
                                {error && <Alert severity="error" variant="outlined" color="error" sx={{ mt: 1, mb: 1 }}>{error}</Alert>}
                                <Grid container>
                                    <Grid item xs>
                                        <Link component={RouterLink} to="/forgot-password"  variant="body2" sx={{ color: '#033363' }}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link component={RouterLink} to="/register" variant="body2" sx={{ color: '#033363' }}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
