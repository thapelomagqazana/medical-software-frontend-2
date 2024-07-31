import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Typography, Alert } from "@mui/material";
import { updateAppointment } from "../../redux/slices/appointmentsSlice";

const CancelModal = ({ appointment, open, handleClose }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");

    const handleCancel = () => {
        setLoading(true);
        dispatch(updateAppointment({
            id: appointment._id,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId._id,
            status: "cancelled"
        }))
            .then(response => {
                if (response.type === 'appointments/updateAppointment/fulfilled') {
                    setSuccessMessage(`Appointment: ${appointment._id} has been successfully cancelled.`);
                    setError("");
                    setTimeout(() => {
                        setSuccessMessage("");
                        handleClose();
                    }, 2000); 
    
                } else if (response.payload === "Server Error") {
                    setError(response.payload);
                    setLoading(false);
                } else {
                    setError(response.payload.msg);
                    setLoading(false);
                } 
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogContent sx={{ minHeight: '200px' }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography>Are you sure you want to cancel this appointment?</Typography>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" disabled={loading}>No</Button>
                <Button onClick={handleCancel} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Yes, Cancel'}
                </Button>
            </DialogActions>
        </Dialog>  
    );
};

export default CancelModal;