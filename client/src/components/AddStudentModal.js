import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddStudentModal = ({ open, handleClose, refreshStudents, classes }) => {
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        enrolledClass: '',
        parentEmail: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.post('http://localhost:5000/api/students', formData, config);
            
            refreshStudents();
            handleClose();
        } catch (err) {
            console.error('Failed to add student', err);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Student ID" name="studentId" onChange={handleChange} autoFocus />
                    <TextField margin="normal" required fullWidth label="Full Name" name="name" onChange={handleChange} />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="enrolled-class-label">Enrolled Class</InputLabel>
                        <Select
                            labelId="enrolled-class-label"
                            name="enrolledClass"
                            value={formData.enrolledClass}
                            label="Enrolled Class"
                            onChange={handleChange}
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls._id} value={cls.classCode}>
                                    {cls.name} ({cls.classCode})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField margin="normal" fullWidth label="Parent's Email" name="parentEmail" type="email" onChange={handleChange} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Add Student</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStudentModal;