import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm, studentName }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the student "{studentName}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;