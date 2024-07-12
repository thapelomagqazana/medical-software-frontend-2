import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import RescheduleModal from './RescheduleModal';
import CancelModal from './CardModal';
import { fetchAppointments } from '../../redux/patientDataSlice';
import { useDispatch } from 'react-redux';

const AppointmentTable = ({ appointments }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const dispatch = useDispatch();

    const handleReschedule = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCancel = (appointment) => {
        setSelectedAppointment(appointment);
        setOpenCancelModal(true);
    };

    const handleClose = () => {
        setSelectedAppointment(null);
        setOpenCancelModal(false);
        dispatch(fetchAppointments());
    };

    return (
        <>
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
                                    sx={{ mr: 1 }}
                                >
                                    Reschedule
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    onClick={() => handleCancel(appointment)}
                                >
                                    Cancel
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
                />
            )}
            {selectedAppointment && openCancelModal && (
                <CancelModal
                    appointment={selectedAppointment}
                    open={openCancelModal}
                    handleClose={handleClose}
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
