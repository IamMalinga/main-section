import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/trip-planner');
    } catch (error) {
      console.error('Invalid credentials', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2">
        New user? <Link onClick={() => navigate('/register')}>Register here</Link>
      </Typography>
    </Box>
  );
};

export default Login;
