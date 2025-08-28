import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Avatar, Button, TextField, Skeleton, Alert, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
    const [teacher, setTeacher] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [profilePic, setProfilePic] = useState(null);

    // --- THIS FUNCTION IS UPDATED ---
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            // Add a unique timestamp to the URL to prevent caching
            const response = await axios.get(`http://localhost:5000/api/auth/me?t=${new Date().getTime()}`, config);
            setTeacher(response.data);
            setFormData({ name: response.data.name, email: response.data.email });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    // --- THIS FUNCTION IS ALSO UPDATED TO BE SIMPLER ---
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };

        try {
            // We can run these in parallel for speed
            const promises = [];
            // If there's a new picture, add its upload to our list of tasks
            if (profilePic) {
                const picFormData = new FormData();
                picFormData.append('profilePicture', profilePic);
                promises.push(axios.post('http://localhost:5000/api/profile/picture', picFormData, config));
            }
            // Always add the text update to our list of tasks
            promises.push(axios.put('http://localhost:5000/api/profile', formData, config));

            // Wait for all save operations to complete
            await Promise.all(promises);
            
            setEditMode(false);
            setProfilePic(null);
            fetchProfile(); // Re-fetch the data now that we know saves are done
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };
    
    if (isLoading) return <Skeleton variant="rectangular" width={400} height={300} />;
    
    // It's good practice to handle the case where teacher is still null after loading
    if (!teacher) return <Alert severity="error">Could not load profile.</Alert>;

    return (
        <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
            <Card sx={{ minWidth: 450, boxShadow: 3, position: 'relative' }}>
                <IconButton onClick={() => setEditMode(!editMode)} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <EditIcon />
                </IconButton>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Avatar
                        src={teacher.profilePicture ? `http://localhost:5000/${teacher.profilePicture.replace(/\\/g, '/')}` : ''}
                        sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 100 }} />
                    </Avatar>

                    {editMode ? (
                        <Box component="form" noValidate autoComplete="off">
                            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} sx={{ mb: 2 }} />
                            <Button variant="contained" component="label" sx={{ mb: 2 }}>
                                Upload New Picture
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                            {profilePic && <Typography variant="body2">{profilePic.name}</Typography>}
                            <Box sx={{ mt: 2 }}>
                                <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ mr: 1 }}>Cancel</Button>
                                <Button variant="contained" onClick={handleSave}>Save</Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="h4">{teacher.name}</Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">Teacher Profile</Typography>
                            <Typography variant="body1">{teacher.email}</Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfilePage;