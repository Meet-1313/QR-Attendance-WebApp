// client/src/pages/NotificationsPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Slider, Typography, Alert } from '@mui/material';

const NotificationsPage = () => {
    const [classId, setClassId] = useState('CS101');
    const [threshold, setThreshold] = useState(75);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCheckAttendance = async () => {
        setIsLoading(true);
        setError('');
        setResult(null);
        try {
            const response = await axios.post('http://localhost:5000/api/notifications/low-attendance', { classId, threshold });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Low Attendance Notifications</Typography>
            <Card>
                <CardContent>
                    <Typography gutterBottom>
                        Select a class and an attendance threshold. The system will find all students below this threshold and send a notification email to their parents.
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
                        <InputLabel>Class</InputLabel>
                        <Select value={classId} label="Class" onChange={(e) => setClassId(e.target.value)}>
                            <MenuItem value="CS101">Computer Science 101</MenuItem>
                            <MenuItem value="MA203">Calculus II</MenuItem>
                            <MenuItem value="PH150">Physics for Beginners</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography gutterBottom>Attendance Threshold: {threshold}%</Typography>
                    <Slider
                        value={threshold}
                        onChange={(e, newValue) => setThreshold(newValue)}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={10}
                        max={90}
                    />
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button variant="contained" onClick={handleCheckAttendance} disabled={isLoading}>
                            {isLoading ? <CircularProgress size={24} /> : 'Find Students & Send Notifications'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {result && (
                <Alert severity="success" sx={{ mt: 3 }}>
                    <Typography gutterBottom>{result.message}</Typography>
                    {result.students.length > 0 && (
                        <ul>
                            {result.students.map(s => (
                                <li key={s.studentId}>{s.name} ({s.percentage}% attendance)</li>
                            ))}
                        </ul>
                    )}
                </Alert>
            )}
            {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
        </Box>
    );
};

export default NotificationsPage;