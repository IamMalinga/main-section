import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#FF5722',
        },
        background: {
            default: '#F5F5F5',
        },
        text: {
            primary: '#212121',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h5: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: ['none', '0px 4px 20px rgba(0, 0, 0, 0.1)'],
});

export default theme;
