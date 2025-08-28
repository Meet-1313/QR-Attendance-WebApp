// client/src/theme.js
import { createTheme } from '@mui/material/styles';

// Define the light theme
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // A professional blue
        },
        secondary: {
            main: '#dc004e', // A contrasting pink/red
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
    },
});

// Define the dark theme
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // A lighter blue for dark mode
        },
        secondary: {
            main: '#f48fb1', // A lighter pink for dark mode
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
});