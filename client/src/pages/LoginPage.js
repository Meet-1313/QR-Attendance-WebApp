import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import School from '@mui/icons-material/School'; // <-- CORRECTED IMPORT
import Notification from '../components/Notification';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            window.location.reload();
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed.';
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
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleChange}/>
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handleChange}/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/register" variant="body2" style={{textDecoration: 'none', color: '#1976d2'}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;