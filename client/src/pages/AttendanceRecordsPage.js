import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const AttendanceRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                const response = await axios.get('http://localhost:5000/api/attendance/records', config);
                setRecords(response.data);
            } catch (err) {
                setError('Failed to fetch attendance records.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecords();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom><Skeleton width="40%" /></Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                                <TableCell><Skeleton /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

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
                    <motion.tbody
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {records.map((record) => (
                            <motion.tr
                                key={record._id}
                                variants={itemVariants}
                            >
                                <TableCell>{record.student ? record.student.name : 'N/A'}</TableCell>
                                <TableCell>{record.student ? record.student.studentId : 'N/A'}</TableCell>
                                <TableCell>{record.class}</TableCell>
                                <TableCell>{new Date(record.timestamp).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(record.timestamp).toLocaleTimeString()}</TableCell>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AttendanceRecordsPage;