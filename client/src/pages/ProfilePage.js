// client/src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Avatar, CircularProgress, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfilePage = () => {
    const [teacher, setTeacher] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Get the token from local storage
                const token = localStorage.getItem('token');
                
                // Set up headers for the authenticated request
                const config = {
                    headers: {
                        'x-auth-token': token,
                    },
                };

                // Fetch profile data from the secure endpoint
                const response = await axios.get('http://localhost:5000/api/auth/me', config);
                setTeacher(response.data);
            } catch (err) {
                setError('Could not fetch profile data.');
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!teacher) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
            <Card sx={{ minWidth: 400, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px', bgcolor: 'primary.main' }}>
                        <AccountCircleIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Typography variant="h4" component="div">
                        {teacher.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Teacher Profile
                    </Typography>
                    <Typography variant="body1">
                        Email: {teacher.email}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfilePage;