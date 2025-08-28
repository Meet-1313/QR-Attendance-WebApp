import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditStudentModal = ({ open, handleClose, refreshStudents, student, classes }) => {
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        enrolledClass: '',
        parentEmail: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                studentId: student.studentId || '',
                name: student.name || '',
                enrolledClass: student.enrolledClass || '',
                parentEmail: student.parentEmail || ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.put(`http://localhost:5000/api/students/${student._id}`, formData, config);
            
            refreshStudents();
            handleClose();
        } catch (err) {
            console.error('Failed to update student', err);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Student Details</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} autoFocus />
                    <TextField margin="normal" required fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} />
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
                    <TextField margin="normal" fullWidth label="Parent's Email" name="parentEmail" type="email" value={formData.parentEmail} onChange={handleChange} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStudentModal;