// client/src/components/AddClassModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';

const AddClassModal = ({ open, handleClose, refreshClasses }) => {
    const [formData, setFormData] = useState({ name: '', classCode: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.post('http://localhost:5000/api/classes', formData, config);
            
            refreshClasses();
            handleClose();
        } catch (err) {
            console.error('Failed to add class', err);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Class Name (e.g., Morning Physics)" name="name" onChange={handleChange} autoFocus />
                    <TextField margin="normal" required fullWidth label="Class Code (e.g., PHYS101)" name="classCode" onChange={handleChange} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Create Class</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddClassModal;