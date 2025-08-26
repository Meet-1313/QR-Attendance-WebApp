// client/src/pages/Dashboard.js

import React, { useState } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import LiveAttendance from '../components/LiveAttendance';
import AttendanceSummaryChart from '../components/AttendanceSummaryChart';
import { Box, Grid, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const Dashboard = () => {
    const [selectedClass, setSelectedClass] = useState('CS101');

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>Teacher Dashboard</Typography>
            
            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="class-select-label">Select Class</InputLabel>
                <Select
                    labelId="class-select-label"
                    value={selectedClass}
                    label="Select Class"
                    onChange={handleClassChange}
                >
                    <MenuItem value="CS101">Computer Science 101</MenuItem>
                    <MenuItem value="MA203">Calculus II</MenuItem>
                    <MenuItem value="PH150">Physics for Beginners</MenuItem>
                </Select>
            </FormControl>
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                    <QRCodeGenerator classId={selectedClass} />
                </Grid>
                
                <Grid item xs={12} md={7}>
                    <LiveAttendance />
                </Grid>

                {/* --- THIS IS THE UPDATED PART --- */}
                {/* We wrap the chart in a container grid to center it */}
                <Grid item xs={12} container justifyContent="center" sx={{ mt: 4 }}>
                    {/* The chart itself now only takes up 10 of 12 columns on large screens */}
                    <Grid item xs={12} lg={10}>
                        <AttendanceSummaryChart />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;