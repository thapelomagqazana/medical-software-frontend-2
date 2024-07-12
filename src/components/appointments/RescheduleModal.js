import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { rescheduleAppointment } from '../../redux/appointmentsSlice';

const RescheduleModal = ({ appointment, open, handleClose, onSuccess }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Convert UTC time to local time when initializing
    const convertToLocalTime = (utcDate) => {
        const date = new Date(utcDate);
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    };

    const convertToUTC = (localDate) => {
        const date = new Date(localDate);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    };

    const [newStartTime, setNewStartTime] = useState(convertToLocalTime(new Date(appointment.startTime)));

    const handleSave = () => {
        setLoading(true);
        const utcStartTime = convertToUTC(newStartTime);
        const newEndTime = new Date(utcStartTime.getTime() + 90 * 60 * 1000);

        dispatch(rescheduleAppointment({ 
            id: appointment._id, 
            startTime: utcStartTime.toISOString(), 
            endTime: newEndTime.toISOString(), 
            patientId: appointment.patientId, 
            doctorId: appointment.doctorId._id 
        }))
        .then(response => {
            // console.log(response.type);
            // console.log(response.type === 'appointments/rescheduleAppointment/fulfilled');
            if (response.type === 'appointments/rescheduleAppointment/fulfilled') {
                onSuccess(`Appointment: ${appointment._id} has been successfully updated.`);
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
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogContent sx={{ minHeight: '300px' }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <DatePicker
                        selected={newStartTime}
                        onChange={(date) => setNewStartTime(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        customInput={<TextField fullWidth label="New Start Time" />}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" disabled={loading}>Cancel</Button>
                <Button onClick={handleSave} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RescheduleModal;
