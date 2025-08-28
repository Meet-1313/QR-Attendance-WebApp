import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Skeleton, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyState from '../components/EmptyState';
import AddClassModal from '../components/AddClassModal';
import EditClassModal from '../components/EditClassModal';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingClass, setDeletingClass] = useState(null);

    const fetchClasses = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const response = await axios.get('http://localhost:5000/api/classes', config);
            setClasses(response.data);
        } catch (err) {
            console.error('Failed to fetch classes', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    const handleEditOpen = (cls) => {
        setEditingClass(cls);
        setEditModalOpen(true);
    };

    const handleDeleteOpen = (cls) => {
        setDeletingClass(cls);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.delete(`http://localhost:5000/api/classes/${deletingClass._id}`, config);
            fetchClasses();
            setDeleteDialogOpen(false);
        } catch (err) {
            console.error('Failed to delete class', err);
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(3)].map((_, index) => (
                                <TableRow key={index}>
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
                <Typography variant="h4" gutterBottom>My Classes</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddModalOpen(true)}>Add Class</Button>
            </Box>

            <AddClassModal open={addModalOpen} handleClose={() => setAddModalOpen(false)} refreshClasses={fetchClasses} />
            <EditClassModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} refreshClasses={fetchClasses} cls={editingClass} />
            <ConfirmDeleteDialog open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleConfirm={handleDeleteConfirm} studentName={deletingClass?.name} />

            {classes.length === 0 ? (
                <Paper sx={{ mt: 2, p: 4 }}>
                    <EmptyState title="No Classes Found" message="Get started by creating your first class." />
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Class Name</TableCell>
                                <TableCell>Class Code</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classes.map((cls) => (
                                <TableRow key={cls._id}>
                                    <TableCell>{cls.name}</TableCell>
                                    <TableCell>{cls.classCode}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleEditOpen(cls)}><EditIcon /></IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteOpen(cls)}><DeleteIcon color="error" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default ClassesPage;