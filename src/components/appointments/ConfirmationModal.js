import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const ConfirmationModal = ({ open, handleClose, selectedSlot, handleConfirm, handleSpecialRequestChange }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 2, p: 4, boxShadow: 24 }}>
                <Typography variant="h6" gutterBottom>Confirm Appointment</Typography>
                <Typography variant="body1" gutterBottom><strong>Date:</strong> {selectedSlot?.date}</Typography>
                <Typography variant="body1" gutterBottom><strong>Time:</strong> {selectedSlot?.time}</Typography>
                <TextField
                    label="Special Instructions or Requests"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    margin="normal"
                    onChange={handleSpecialRequestChange}
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
