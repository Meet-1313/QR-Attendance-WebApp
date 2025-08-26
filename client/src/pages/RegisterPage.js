import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import School from '@mui/icons-material/School'; // <-- CORRECTED IMPORT
import Notification from '../components/Notification';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            setNotification({ open: true, message: 'Registration successful! Redirecting to login...', severity: 'success' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed.';
            setNotification({ open: true, message, severity: 'error' });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Notification notification={notification} setNotification={setNotification} />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <School /> {/* <-- USE CORRECTED COMPONENT */}
                </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField name="name" required fullWidth id="name" label="Name" autoFocus onChange={handleChange}/></Grid>
                        <Grid item xs={12}><TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={handleChange}/></Grid>
                        <Grid item xs={12}><TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={handleChange}/></Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2" style={{textDecoration: 'none', color: '#1976d2'}}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;