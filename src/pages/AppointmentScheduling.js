import React, { useState } from 'react';
import { Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CalendarView from '../components/appointments/CalendarView';
import AvailableTimeSlots from '../components/appointments/AvailableTimeSlots';
import DoctorSelection from '../components/appointments/DoctorSelection';
import ConfirmationModal from '../components/appointments/ConfirmationModal';
import { scheduleAppointment } from '../redux/slices/appointmentsSlice';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AppointmentScheduling = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const patientId = useSelector((state) => state.auth.user.user.id);

    const handleConfirm = async (specialInstructions) => {
        const appointmentData = {
            patientId,
            doctorId: selectedDoctor,
            startTime: selectedTimeSlot.time,
            endTime: new Date(new Date(selectedTimeSlot.time).getTime() + 60 * 60 * 1000).toISOString(),
            reason: specialInstructions,
        };
        // console.log(appointmentData);
        try {
            await dispatch(scheduleAppointment({ patientId, appointmentData })).unwrap();
            setSnackbarMessage("Appointment successfully scheduled!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setConfirmationModalOpen(false);
            setSelectedTimeSlot(null); // Reset selectedTimeSlot after confirmation

            // Redirect to the dashboard or appointment summary page after a short delay
            setTimeout(() => {
                navigate('/patient/dashboard');
            }, 2000);
        } catch (error) {
            setSnackbarMessage('Failed to schedule appointment. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ paddingBottom: '200px' }}>
            <Container>
                <Box mt={4}>
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                        align="center" 
                        sx={{ fontWeight: "bold", color: 'primary.main' }}
                    >
                        Schedule Appointment
                    </Typography>
                    <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <DoctorSelection selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />
                    {selectedDoctor && (
                        <AvailableTimeSlots
                            selectedDate={selectedDate}
                            selectedDoctor={selectedDoctor}
                            setSelectedTimeSlot={(slot) => {
                                setSelectedTimeSlot(slot);
                                setConfirmationModalOpen(true);
                            }}
                        />
                    )}
                    <ConfirmationModal
                        open={confirmationModalOpen}
                        handleClose={() => setConfirmationModalOpen(false)}
                        selectedDate={selectedDate}
                        selectedTimeSlot={selectedTimeSlot}
                        handleConfirm={handleConfirm}
                    />
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </Box>

    );
};

export default AppointmentScheduling;
