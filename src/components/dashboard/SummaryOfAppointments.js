import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Chip, Modal, Paper } from '@mui/material';
import { format } from 'date-fns';

/**
 * SummaryOfAppointments component
 * 
 * This component displays a summary of the user's upcoming appointments.
 *
 * Props:
 * - appointments (array): A list of appointment objects containing date, time, doctor's name, and status.
 * - onReschedule (function): Function to handle rescheduling an appointment.
 * - onCancel (function): Function to handle canceling an appointment.
 *
 * Example usage:
 * <SummaryOfAppointments 
 *    appointments={[{ date: new Date(), time: '10:00 AM', doctorName: 'Dr. Smith', status: 'confirmed' }]} 
 *    onReschedule={handleReschedule} 
 *    onCancel={handleCancel} 
 * />
 */
const SummaryOfAppointments = ({ appointments, onReschedule, onCancel }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseDetails = () => {
        setSelectedAppointment(null);
    };

    const getStatusChip = (status) => {
        let color = 'default';
        if (status === 'scheduled') color = 'success';
        if (status === 'pending') color = 'warning';
        if (status === 'completed') color = 'info';
        if (status === 'cancelled') color = 'error';
        return <Chip label={status} color={color} />;
    };

    return (
        <Box 
            textAlign="center" 
            my={{ xs: 2, md: 4 }} 
            p={{ xs: 2, md: 4 }} 
            bgcolor="background.paper" 
            borderRadius={2} 
            boxShadow={3}
        >
            <Typography 
                variant="h6" 
                component="h2" 
                gutterBottom 
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
                Your Upcoming Appointments
            </Typography>
            <List>
                {appointments.slice(0, 3).map((appointment, index) => (
                    <ListItem 
                        key={index} 
                        divider 
                        button
                        onClick={() => handleViewDetails(appointment)}
                    >
                        <ListItemText
                            primary={`${format(new Date(appointment.startTime), 'PPP')} at ${format(new Date(appointment.startTime), 'p')}`}
                            secondary={`with Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}
                        />
                        <ListItemSecondaryAction>
                            {getStatusChip(appointment.status)}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Modal open={!!selectedAppointment} onClose={handleCloseDetails}>
                <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
                    {selectedAppointment && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Appointment Details
                            </Typography>
                            <Typography variant="body1">
                                <strong>Date:</strong> {format(new Date(selectedAppointment.startTime), 'PPP')}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Time:</strong> {format(new Date(selectedAppointment.startTime), 'p')}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Doctor:</strong> Dr. {selectedAppointment.doctorId.firstName} {selectedAppointment.doctorId.lastName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Reason:</strong> {selectedAppointment.reason}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Status:</strong> {selectedAppointment.status}
                            </Typography>
                            {selectedAppointment.status === 'scheduled' && (
                                <Box mt={2} display="flex" justifyContent="space-between">
                                    <Button 
                                        onClick={() => { onReschedule(selectedAppointment); handleCloseDetails(); }} 
                                        variant="outlined" 
                                        color="primary"
                                        fullWidth
                                        sx={{ mr: 1 }}
                                    >
                                        Reschedule
                                    </Button>
                                    <Button 
                                        onClick={() => { onCancel(selectedAppointment); handleCloseDetails(); }} 
                                        variant="outlined" 
                                        color="secondary"
                                        fullWidth
                                        sx={{ ml: 1 }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            )}
                            <Box mt={2}>
                                <Button onClick={handleCloseDetails} variant="contained" color="primary" fullWidth>
                                    Close
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>
        </Box>
    );
};

export default SummaryOfAppointments;
