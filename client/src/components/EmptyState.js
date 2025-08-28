// client/src/components/EmptyState.js
import React from 'react';
import { Box, Typography } from '@mui/material';
// --- Import the SVG as a React component ---
import { ReactComponent as EmptyIllustration } from '../assets/undraw_empty_4zx0.svg'; // Make sure the filename matches what you downloaded

const EmptyState = ({ title, message }) => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}
        >
            <EmptyIllustration style={{ width: '200px', height: '200px', marginBottom: '16px' }} />
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default EmptyState;