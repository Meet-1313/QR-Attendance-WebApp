import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';

const AttendanceRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token,
                    },
                };
                const response = await axios.get('http://localhost:5000/api/attendance/records', config);
                setRecords(response.data);
            } catch (err) {
                setError('Failed to fetch attendance records.');
            }
        };
        fetchRecords();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Attendance History</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="attendance records table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record._id}>
                                <TableCell>{record.student ? record.student.name : 'N/A'}</TableCell>
                                <TableCell>{record.student ? record.student.studentId : 'N/A'}</TableCell>
                                <TableCell>{record.class}</TableCell>
                                <TableCell>{new Date(record.timestamp).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(record.timestamp).toLocaleTimeString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AttendanceRecordsPage;