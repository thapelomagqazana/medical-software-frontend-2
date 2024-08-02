import React, { useState } from 'react';
import { format } from 'date-fns';
import { fromZonedTime } from "date-fns-tz";
import { Box, Typography, Button, Modal, Paper, TextField } from '@mui/material';

const timeZone = "Africa/Johannesburg";

const ConfirmationModal = ({ open, handleClose, selectedDate, selectedTimeSlot, handleConfirm }) => {
    const [specialInstructions, setSpecialInstructions] = useState('');

    // Combine selectedDate and selectedTimeSlot into a single datetime
    const combinedDatetime = selectedTimeSlot ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), new Date(selectedTimeSlot.time).getHours(), new Date(selectedTimeSlot.time).getMinutes()) : null;

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
                {selectedTimeSlot && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Confirm Appointment
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Date:</strong> {format(fromZonedTime(new Date(combinedDatetime), timeZone), 'PPP')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Time:</strong> {format(fromZonedTime(new Date(combinedDatetime), timeZone), 'p')}
                        </Typography>
                        <TextField
                            label="Special Instructions"
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                        />
                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button onClick={handleClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleConfirm(specialInstructions)} variant="contained" color="primary">
                                Confirm
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Modal>
    );
};

export default ConfirmationModal;
