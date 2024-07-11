import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AppointmentTable = ({ appointments }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Doctor</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                        <TableRow key={appointment._id}>
                            <TableCell>{formatDate(appointment.startTime)}</TableCell>
                            <TableCell>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</TableCell>
                            <TableCell>Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}</TableCell>
                            <TableCell>{appointment.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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
