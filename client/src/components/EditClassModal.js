import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';

const EditClassModal = ({ open, handleClose, refreshClasses, cls }) => {
    const [formData, setFormData] = useState({ name: '', classCode: '' });

    useEffect(() => {
        if (cls) {
            setFormData({
                name: cls.name || '',
                classCode: cls.classCode || '',
            });
        }
    }, [cls]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.put(`http://localhost:5000/api/classes/${cls._id}`, formData, config);
            
            refreshClasses();
            handleClose();
        } catch (err) {
            console.error('Failed to update class', err);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Class Name" name="name" value={formData.name} onChange={handleChange} autoFocus />
                    <TextField margin="normal" required fullWidth label="Class Code" name="classCode" value={formData.classCode} onChange={handleChange} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditClassModal;