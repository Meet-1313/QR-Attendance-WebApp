import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { CssBaseline, Container } from '@mui/material';
import { CustomThemeProvider } from './contexts/ThemeContext';

import PageLayout from './components/PageLayout'; 
import Navbar from './components/Navbar';

// Import all pages
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage';
import AttendanceRecordsPage from './pages/AttendanceRecordsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import ClassesPage from './pages/ClassesPage';


const ProtectedLayout = ({ children }) => (
    <>
        <Navbar />
        <PageLayout>
            {children}
        </PageLayout>
    </>
);

const AppRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/dashboard" />} />
                <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/dashboard" />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={token ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Navigate to="/login" />} />
                <Route path="/students" element={token ? <ProtectedLayout><StudentsPage /></ProtectedLayout> : <Navigate to="/login" />} />
                <Route path="/records" element={token ? <ProtectedLayout><AttendanceRecordsPage /></ProtectedLayout> : <Navigate to="/login" />} />
                <Route path="/notifications" element={token ? <ProtectedLayout><NotificationsPage /></ProtectedLayout> : <Navigate to="/login" />} />
                <Route path="/profile" element={token ? <ProtectedLayout><ProfilePage /></ProtectedLayout> : <Navigate to="/login" />} />
                <Route path="/classes" element={token ? <ProtectedLayout><ClassesPage /></ProtectedLayout> : <Navigate to="/login" />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <CustomThemeProvider>
            <CssBaseline />
            <Router>
                <Container maxWidth="xl" disableGutters>
                    <AppRoutes />
                </Container>
            </Router>
        </CustomThemeProvider>
    );
}

export default App;