import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

import QRCodeGenerator from '../components/QRCodeGenerator';
import LiveAttendance from '../components/LiveAttendance';
import AttendanceSummaryChart from '../components/AttendanceSummaryChart';

const Dashboard = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    const fetchClasses = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const response = await axios.get('http://localhost:5000/api/classes', config);
            setClasses(response.data);

            if (response.data.length > 0 && !selectedClass) {
                setSelectedClass(response.data[0].classCode);
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    }, [selectedClass]);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
                <FormControl sx={{ minWidth: 240 }} size="small">
                    <InputLabel id="class-select-label">Select Class</InputLabel>
                    <Select
                        labelId="class-select-label"
                        value={selectedClass}
                        label="Select Class"
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {classes.length > 0 ? (
                            classes.map((cls) => (
                                <MenuItem key={cls._id} value={cls.classCode}>
                                    {cls.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>Create a class first</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
            
            <Grid container spacing={3} sx={{ mt: 1 }}>
                {/* Left Column */}
                <Grid item xs={12} md={5}>
                    <QRCodeGenerator classId={selectedClass} />
                </Grid>
                {/* Right Column */}
                <Grid item xs={12} md={7}>
                    <LiveAttendance />
                </Grid>
                {/* Bottom Row */}
                <Grid item xs={12}>
                    <AttendanceSummaryChart />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;