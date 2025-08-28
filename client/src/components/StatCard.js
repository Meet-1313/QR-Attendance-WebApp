// client/src/components/StatCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} style={{ height: '100%' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: color }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ fontSize: '3rem' }}>{icon}</Box>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                    <Typography color="text.secondary">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default StatCard;