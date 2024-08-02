import React, { useState } from "react";
import { Box, Typography, Button, Modal, Paper, TextField, useMediaQuery, useTheme } from "@mui/material";
import CalendarView from "./CalendarView";
import { fromZonedTime } from "date-fns-tz";
import { format } from 'date-fns';
import AvailableTimeSlots from "./AvailableTimeSlots";

const timeZone = "Africa/Johannesburg";

const RescheduleModal = ({ open, handleClose, selectedAppointment, handleReschedule }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    
    return (
        <Modal open={open} onClose={handleClose}>
            <Paper
                sx={{
                    width: isMobile ? '90%' : 500,
                    mx: 'auto',
                    mt: isMobile ? 2 : 4,
                    p: isMobile ? 2 : 3,
                    maxHeight: isMobile ? '90vh' : 'auto',
                    overflowY: 'auto',
                }}
            >
                {selectedAppointment && (
                    <>
                        <Typography                                
                            variant="h6"                     
                            mb={2}
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: 'primary.main' }}
                        >
                            Reschedule Appointment
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Current Date:</strong> {format(fromZonedTime(new Date(selectedAppointment.startTime), timeZone), 'PPP')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Current Time:</strong> {format(fromZonedTime(new Date(selectedAppointment.startTime), timeZone), 'p')}
                        </Typography>
                        <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <AvailableTimeSlots
                            selectedDate={selectedDate}
                            selectedDoctor={selectedAppointment.doctorId._id}
                            setSelectedTimeSlot={setSelectedTimeSlot}
                        />
                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button onClick={handleClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                            <Button
                                onClick={() => handleReschedule(selectedAppointment, selectedDate, selectedTimeSlot)}
                                variant="contained"
                                color="primary"
                                disabled={!selectedTimeSlot}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Modal>
    );
};

export default RescheduleModal;