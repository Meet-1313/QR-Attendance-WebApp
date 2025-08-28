import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icons for the features section
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AssessmentIcon from '@mui/icons-material/Assessment';

const features = [
    {
        icon: <QrCodeScannerIcon sx={{ fontSize: 40 }} />,
        title: 'Dynamic QR Codes',
        description: 'Secure, time-sensitive QR codes refresh every 15 seconds to ensure accurate check-ins.'
    },
    {
        icon: <LiveTvIcon sx={{ fontSize: 40 }} />,
        title: 'Real-Time Dashboard',
        description: 'Watch attendance update live on a dynamic, customizable dashboard as students scan in.'
    },
    {
        icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
        title: 'Powerful Analytics',
        description: 'Visualize attendance trends with daily summary charts and detailed historical records.'
    }
];

const LandingPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* --- Hero Section --- */}
            <Box
                sx={{
                    pt: 12,
                    pb: 12,
                    textAlign: 'center',
                    color: 'white',
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)', // A nice blue gradient
                }}
            >
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Typography variant="h2" component="h1" fontWeight="700" gutterBottom>
                            The Modern Way to Track Attendance
                        </Typography>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <Typography variant="h5" color="white" paragraph>
                            Streamline your classroom with a secure, real-time QR code attendance system. Effortless for students, powerful for teachers.
                        </Typography>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/login"
                            sx={{ mt: 4, backgroundColor: 'white', color: 'primary.main', '&:hover': { backgroundColor: '#e0e0e0' } }}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </Container>
            </Box>

            {/* --- Features Section --- */}
            <Container sx={{ py: 8 }} maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
                    Key Features
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                                    <Box color="primary.main">{feature.icon}</Box>
                                    <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* --- Footer --- */}
            <Box sx={{ bgcolor: 'background.paper', p: 3, textAlign: 'center' }} component="footer">
                <Typography variant="body2" color="text.secondary">
                    {'Copyright © '}
                    QR Attendance System {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;