import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Skeleton, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyState from '../components/EmptyState';
import AddStudentModal from '../components/AddStudentModal';
import EditStudentModal from '../components/EditStudentModal';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingStudent, setDeletingStudent] = useState(null);

    const fetchStudents = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const [studentsRes, classesRes] = await Promise.all([
                axios.get('http://localhost:5000/api/students', config),
                axios.get('http://localhost:5000/api/classes', config)
            ]);
            setStudents(studentsRes.data);
            setClasses(classesRes.data);
        } catch (err) {
            setError('Failed to fetch data.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleEditOpen = (student) => {
        setEditingStudent(student);
        setEditModalOpen(true);
    };

    const handleDeleteOpen = (student) => {
        setDeletingStudent(student);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.delete(`http://localhost:5000/api/students/${deletingStudent._id}`, config);
            fetchStudents();
            setDeleteDialogOpen(false);
        } catch (err) {
            console.error('Failed to delete student', err);
        }
    };

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>Registered Students</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddModalOpen(true)}>Add Student</Button>
            </Box>
            {error && <Typography color="error">{error}</Typography>}

            <AddStudentModal open={addModalOpen} handleClose={() => setAddModalOpen(false)} refreshStudents={fetchStudents} classes={classes} />
            <EditStudentModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} refreshStudents={fetchStudents} student={editingStudent} classes={classes} />
            <ConfirmDeleteDialog open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleConfirm={handleDeleteConfirm} studentName={deletingStudent?.name} />

            {!isLoading && students.length === 0 ? (
                <Paper sx={{ mt: 2, p: 4 }}>
                    <EmptyState title="No Students Found" message="Get started by adding your first student to the system." />
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Enrolled Class</TableCell>
                                <TableCell>Parent's Email</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                            {students.map((student) => (
                                <motion.tr key={student.studentId} variants={itemVariants}>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.enrolledClass}</TableCell>
                                    <TableCell>{student.parentEmail}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleEditOpen(student)}><EditIcon /></IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteOpen(student)}><DeleteIcon color="error" /></IconButton>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default StudentsPage;