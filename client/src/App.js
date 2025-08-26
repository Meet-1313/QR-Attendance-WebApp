// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage'; // <-- Import the new page
import Navbar from './components/Navbar'; // <-- Import the Navbar
import { CssBaseline, Container } from '@mui/material';
import AttendanceRecordsPage from './pages/AttendanceRecordsPage'; 
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage'; 

// A helper component to wrap pages that require login
const ProtectedLayout = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
);

function App() {
    const token = localStorage.getItem('token');

    return (
        <>
            <CssBaseline />
            <Router>
                <Container maxWidth="xl" disableGutters>
                    <Routes>
                        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
                        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/dashboard" />} />
                        
                        {/* Protected Routes */}
                        <Route 
                            path="/dashboard" 
                            element={token ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/students" 
                            element={token ? <ProtectedLayout><StudentsPage /></ProtectedLayout> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/records" 
                            element={token ? <ProtectedLayout><AttendanceRecordsPage /></ProtectedLayout> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/profile" 
                            element={token ? <ProtectedLayout><ProfilePage /></ProtectedLayout> : <Navigate to="/login" />} 
                         />
                         <Route 
    path="/notifications" 
    element={token ? <ProtectedLayout><NotificationsPage /></ProtectedLayout> : <Navigate to="/login" />} 
/>
                    </Routes>
                </Container>
            </Router>
        </>
    );
}

export default App;