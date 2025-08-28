// client/src/contexts/ThemeContext.js
import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

// Create a context for the theme
export const ThemeContext = createContext({
    toggleTheme: () => {},
});

export const CustomThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // useMemo ensures the theme is only recalculated when isDarkMode changes
    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};