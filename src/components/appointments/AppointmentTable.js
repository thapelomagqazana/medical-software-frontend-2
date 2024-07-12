import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import RescheduleModal from './RescheduleModal';
import { fetchAppointments } from '../../redux/patientDataSlice';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AppointmentTable = ({ appointments }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleReschedule = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleClose = () => {
        setSelectedAppointment(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        handleClose();
        setTimeout(() => {
            setSuccessMessage("");
            dispatch(fetchAppointments()); // Re-fetch the appointments
            navigate("/your-appointments");
            
        }, 2000); // 2-second delay before clearing the message and closing the modal
    };

    // useEffect(() => {
    //     dispatch(fetchAppointments());
    // }, [dispatch]);

    return (
        <>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow key={appointment._id}>
                                <TableCell>{formatDate(appointment.startTime)}</TableCell>
                                <TableCell>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</TableCell>
                                <TableCell>Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}</TableCell>
                                <TableCell>{appointment.status}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        onClick={() => handleReschedule(appointment)}
                                    >
                                        Reschedule
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedAppointment && (
                <RescheduleModal
                    appointment={selectedAppointment}
                    open={!!selectedAppointment}
                    handleClose={handleClose}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
};

const formatTime = (time) => {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

export default AppointmentTable;
