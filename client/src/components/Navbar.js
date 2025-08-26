// client/src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login
        window.location.reload(); 
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    QR Attendance
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/students">Students</Button>
                    {/* You can add more links here later, e.g., Records, Profile */}
                    <Button color="inherit" component={Link} to="/records">Records</Button> 
                    <Button color="inherit" component={Link} to="/notifications">Notifications</Button> 
                    <Button color="inherit" component={Link} to="/profile">Profile</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;