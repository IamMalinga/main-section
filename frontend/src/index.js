import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'
import { TripContextProvider } from './context/TripContext';
import { AuthContextProvider } from './authentication/context/AuthContext'
import GoogleMapsProvider from './config/GoogleMapsProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
      <GoogleMapsProvider>
        <TripContextProvider>
      
        
        <App />
        
        </TripContextProvider>
        </GoogleMapsProvider>
      </AuthContextProvider>
  
    </ThemeProvider>
  </React.StrictMode>
)