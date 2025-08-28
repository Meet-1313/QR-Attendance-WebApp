// client/src/components/Navbar.js
import React, { useContext } from 'react'; // <-- Import useContext
import { AppBar, Toolbar, Typography, Button, Box, Switch, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext'; // <-- Import the context
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = () => {
    const navigate = useNavigate();
    // --- NEW: Get the toggle function and mode from the context ---
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    QR Attendance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/students">Students</Button>
                    <Button color="inherit" component={Link} to="/classes">Classes</Button> 
                    <Button color="inherit" component={Link} to="/records">Records</Button>
                    <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
                    <Button color="inherit" component={Link} to="/profile">Profile</Button>
                    
                    {/* --- NEW: The Theme Toggle Switch --- */}
                    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;