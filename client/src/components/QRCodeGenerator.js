// client/src/components/QRCodeGenerator.js

import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Box, Button, Stack } from '@mui/material';

const QRCodeGenerator = ({ classId }) => {
    const [qrValue, setQrValue] = useState('');
    const [error, setError] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const intervalRef = useRef(null);

    const fetchQRCodeToken = async () => {
        if (!classId) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/attendance/generate-qr/${classId}`);
            setQrValue(response.data.token);
            setError('');
        } catch (err) {
            console.error("Error fetching QR code token:", err);
            setError('Could not generate QR Code. Please try again.');
        }
    };

    const handleStart = () => {
        setIsGenerating(true);
        fetchQRCodeToken();
    };

    const handleStop = () => {
        setIsGenerating(false);
        setQrValue('');
    };

    useEffect(() => {
        if (isGenerating) {
            intervalRef.current = setInterval(fetchQRCodeToken, 15000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isGenerating, classId]);

    return (
        <Card sx={{ minWidth: 275, textAlign: 'center', p: 2, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Attendance Session
                </Typography>
                
                {isGenerating ? (
                    <>
                        <Box sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {error ? (
                                <Typography color="error">{error}</Typography>
                            ) : qrValue ? (
                                <motion.div
                                    key={qrValue}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <QRCodeSVG value={qrValue} size={256} includeMargin={true} />
                                </motion.div>
                            ) : (
                                <Typography>Generating QR Code...</Typography>
                            )}
                        </Box>
                        <Typography sx={{ mt: 2 }} color="text.secondary">
                            Refreshes every 15 seconds.
                        </Typography>
                    </>
                ) : (
                    <Box sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Click "Start" to begin the session and display the QR code.
                        </Typography>
                    </Box>
                )}

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                    <Button variant="contained" color="success" onClick={handleStart} disabled={isGenerating}>
                        Start
                    </Button>
                    <Button variant="contained" color="error" onClick={handleStop} disabled={!isGenerating}>
                        Stop
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default QRCodeGenerator;