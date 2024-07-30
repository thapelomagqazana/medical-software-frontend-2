import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Chip, Modal, Paper, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
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
                variant="h5"
                mb={2}
                gutterBottom 
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
                <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Your Upcoming Appointments
            </Typography>
            <List>
                {appointments.slice(0, 3).map((appointment, index) => (
                    <ListItem 
                        key={index} 
                        divider 
                        button
                        onClick={() => handleViewDetails(appointment)}
                        sx={{ 
                            cursor: 'pointer', 
                            '&:hover': { bgcolor: 'action.hover' },
                            '&:focus': { outline: 'none', bgcolor: 'action.selected' },
                            '&:active': { bgcolor: 'action.selected' }
                        }}
                    >
                        <ListItemText
                            primary={`${format(new Date(appointment.startTime), 'PPP')} at ${format(new Date(appointment.startTime), 'p')}`}
                            secondary={`with Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}
                        />
                        <ListItemSecondaryAction>
                            {getStatusChip(appointment.status)}
                            {appointment.status === 'scheduled' && (
                                <>
                                    <IconButton 
                                        edge="end" 
                                        color="primary"
                                        onClick={(e) => { e.stopPropagation(); onReschedule(appointment); }}
                                        sx={{ ml: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        edge="end" 
                                        color="secondary"
                                        onClick={(e) => { e.stopPropagation(); onCancel(appointment); }}
                                        sx={{ ml: 1 }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            )}
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
