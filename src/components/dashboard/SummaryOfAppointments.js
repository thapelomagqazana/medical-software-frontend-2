import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Chip, Modal, Paper, IconButton, Fab, Menu, MenuItem } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { format } from 'date-fns';
import { fromZonedTime } from "date-fns-tz";
import RescheduleModal from '../appointments/RescheduleModal';

const timeZone = "Asia/Dubai";

const SummaryOfAppointments = ({ appointments, onReschedule, onCancel, onSchedule }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalContent, setModalContent] = useState('view'); // 'view' or 'reschedule'
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setModalContent('view');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
        setSelectedTimeSlot(null);
    };

    const handleOpenReschedule = (appointment) => {
        setSelectedAppointment(appointment);
        setSelectedDate(new Date());
        setModalContent('reschedule');
        setIsModalOpen(true);
    };

    const handleReschedule = () => {
        onReschedule(selectedAppointment, selectedDate, selectedTimeSlot);
        handleCloseModal();
    };

    const handleOptionsClick = (event, appointment) => {
        event.stopPropagation();
        setSelectedAppointment(appointment);
        setAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setAnchorEl(null);
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography 
                    variant="h5"
                    mb={2}
                    gutterBottom 
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Your Upcoming Appointments
                </Typography>
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    size="small" 
                    onClick={onSchedule}
                >
                    <AddCircleOutlineIcon />
                </Fab>
            </Box>
            {appointments.length > 0 ? (
                <List>
                    {appointments.slice(0, 3).map((appointment, index) => {
                        const localTime = fromZonedTime(new Date(appointment.startTime), timeZone);
                        return (
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
                                    primary={`${format(new Date(localTime), 'PPP')} at ${format(new Date(localTime), 'p')}`}
                                    secondary={`with Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}
                                />
                                <ListItemSecondaryAction>
                                    {getStatusChip(appointment.status)}
                                    <IconButton 
                                        edge="end" 
                                        color="inherit"
                                        onClick={(e) => handleOptionsClick(e, appointment)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleOptionsClose}
                                    >
                                        <MenuItem onClick={() => { handleOptionsClose(); handleOpenReschedule(selectedAppointment); }}>
                                            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Reschedule
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleOptionsClose(); onCancel(selectedAppointment); }}>
                                            <CancelIcon fontSize="small" sx={{ mr: 1 }} /> Cancel
                                        </MenuItem>
                                    </Menu>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    You have no upcoming appointments.
                </Typography>
            )}

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
                    {selectedAppointment && (
                        modalContent === 'view' ? (
                            <>
                                <Typography 
                                    variant="h6"                     
                                    mb={2}
                                    gutterBottom 
                                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                                >
                                    Appointment Details
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Date:</strong> {format(fromZonedTime(new Date(selectedAppointment.startTime), timeZone), 'PPP')}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Time:</strong> {format(fromZonedTime(new Date(selectedAppointment.startTime), timeZone), 'p')}
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
                                    <Button onClick={handleCloseModal} variant="contained" color="primary" fullWidth>
                                        Close
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <RescheduleModal
                                    open={isModalOpen}
                                    handleClose={handleCloseModal}
                                    selectedAppointment={selectedAppointment}
                                    handleReschedule={handleReschedule}
                                />
                            </>
                        )
                    )}
                </Paper>
            </Modal>
        </Box>
    );
};

export default SummaryOfAppointments;


