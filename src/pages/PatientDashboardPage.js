import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Container, Snackbar, Alert } from "@mui/material";
import ErrorAlert from "../components/global/ErrorAlert";
import WelcomeMessage from "../components/dashboard/WelcomeMessage";
import SummaryOfAppointments from "../components/dashboard/SummaryOfAppointments";
import MedicationReminders from "../components/dashboard/MedicationReminders";
import LatestMessages from "../components/dashboard/LatestMessages";
import { fetchUpcomingAppointments } from "../redux/slices/patientDataSlice";
import { fetchProfile } from "../redux/slices/profileSlice";
import { 
    rescheduleAppointment,
    cancelAppointment } from "../redux/slices/appointmentsSlice";
import { fetchPrescriptions } from "../redux/slices/medicationsSlice";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Box } from '@mui/material';

const PatientDashboardPage = () => {

    // Mock data for medications
    const medications = [
        {
            _id: "1",
            name: "Aspirin",
            dosage: "100mg",
            time: "08:00 AM",
            taken: false,
        },
        {
            _id: "2",
            name: "Vitamin D",
            dosage: "50mg",
            time: "12:00 PM",
            taken: false,
        },
        {
            _id: "3",
            name: "Metformin",
            dosage: "500mg",
            time: "06:00 PM",
            taken: false,
        }
    ];

    // Mock data for messages
    const messages = [
        {
            _id: "1",
            doctorName: "Dr. Alice Smith",
            content: "Please remember to take your medication before breakfast.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            read: false,
        },
        {
            _id: "2",
            doctorName: "Dr. Bob Johnson",
            content: "Your lab results are ready. Please check the portal.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            read: false,
        },
        {
            _id: "3",
            doctorName: "Dr. Carol Williams",
            content: "We need to reschedule your appointment to next week.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
            read: true,
        },
        {
            _id: "4",
            doctorName: "Dr. Daniel Brown",
            content: "How are you feeling after the last treatment?",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
            read: true,
        },
        {
            _id: "5",
            doctorName: "Dr. Emily White",
            content: "Your prescription for Metformin has been updated.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
            read: true,
        }
    ];

    const navigate = useNavigate();
    // Mock functions for marking as taken and reordering
    const handleMarkAsTaken = (medication) => {
        console.log('Mark as taken:', medication);
    };

    const handleReorder = (medication) => {
        console.log('Reorder medication:', medication);
    };

    const handleReply = (message) => {
        console.log('Reply to message:', message);
    };
    
    const handleMarkAsRead = (message) => {
        console.log('Mark as read:', message);
    };

    const handleScheduleAppointment = () => {
        navigate('/schedule-appointment');
    };

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    // const { loading, error } = useSelector((state) => state.patientData);
    const user = useSelector((state) => state.auth.user);
    const { profile } = useSelector((state) => state.userProfile);
    // const { medications } = useSelector((state) => state.medications);
    // console.log(user);
    // console.log();
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    const patientId = decodedToken.user.id;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // console.log(appointments);

    useEffect(() => {
        if (user && decodedToken) {
            dispatch(fetchUpcomingAppointments(patientId));
            dispatch(fetchProfile(patientId));
            // dispatch(fetchPrescriptions(patientId));
        }
        
    }, [dispatch, user]);

    const handleReschedule = async (appointment, selectedDate, selectedTimeSlot) => {
        try {
            await dispatch(rescheduleAppointment({ patientId, appointmentId: appointment._id, newDate: selectedDate, newTimeSlot: selectedTimeSlot })).unwrap();
            dispatch(fetchUpcomingAppointments(patientId));
            setSnackbarMessage("Appointment rescheduled successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

        } catch (err) {
            setSnackbarMessage(err.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleCancel = async (appointment) => {
        try {
            await dispatch(cancelAppointment({ patientId, appointmentId: appointment._id })).unwrap();
            dispatch(fetchUpcomingAppointments(patientId));
            setSnackbarMessage("Appointment cancelled successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (err) {
            setSnackbarMessage(err.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }
    
    if (error) {
        return <Box textAlign="center"><ErrorAlert message={error} /></Box>;
    }

    return (
        <Box sx={{ paddingBottom: '150px' }}>
            <Container maxWidth="lg">
                <WelcomeMessage name={`${profile.firstName} ${profile.lastName}`} message={"Here are your latest health updates"} appointmentsCount={appointments.length} newMessagesCount={messages.length} />
                <SummaryOfAppointments 
                    appointments={appointments} 
                    onReschedule={handleReschedule} 
                    onCancel={handleCancel}
                    onSchedule={handleScheduleAppointment} 
                />
                <MedicationReminders medications={medications} onMarkAsTaken={handleMarkAsTaken} onReorder={handleReorder} />
                <LatestMessages messages={messages} onReply={handleReply} onMarkAsRead={handleMarkAsRead} />
            </Container>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>

    
    );
};

export default PatientDashboardPage;