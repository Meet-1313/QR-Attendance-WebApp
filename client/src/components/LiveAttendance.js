// client/src/components/LiveAttendance.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; // Socket.IO client library
import { motion, AnimatePresence } from 'framer-motion'; // For animating list items
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

// Initialize the socket connection outside the component
// to prevent it from reconnecting on every re-render.
// IMPORTANT: Replace with your actual server URL
const socket = io('http://localhost:5000');

const LiveAttendance = () => {
    // State to store the list of students who have checked in
    const [liveAttendees, setLiveAttendees] = useState([]);

    useEffect(() => {
        // Function to handle the 'attendance-updated' event from the server
        const handleAttendanceUpdate = (newAttendee) => {
            // Add the new attendee to the top of the list
            setLiveAttendees(prevAttendees => [newAttendee, ...prevAttendees]);
        };

        // Start listening for the event
        socket.on('attendance-updated', handleAttendanceUpdate);

        // Cleanup function: runs when the component unmounts
        return () => {
            // Stop listening for the event to prevent memory leaks
            socket.off('attendance-updated', handleAttendanceUpdate);
        };
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <Card sx={{ width: '100%', maxHeight: '500px', overflow: 'auto' }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Live Attendance Feed
                </Typography>
                <List>
                    {liveAttendees.length === 0 ? (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                            Waiting for students to scan...
                        </Typography>
                    ) : (
                        <AnimatePresence>
                            {liveAttendees.map((attendee, index) => (
                                // This is where the motion happens!
                                <motion.div
                                    key={attendee.studentId || index} // Use a unique key
                                    layout // This helps animate position changes smoothly
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ListItem>
                                        <ListItemText
                                            primary={attendee.studentName}
                                            secondary={`Checked in at: ${new Date(attendee.timestamp).toLocaleTimeString()}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default LiveAttendance;