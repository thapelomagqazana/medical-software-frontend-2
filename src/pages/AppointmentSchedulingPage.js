import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../components/appointments/CalendarView";
import AppointmentForm from "../components/appointments/AppointmentForm";
import ErrorAlert from "../components/global/ErrorAlert";
import { fetchAppointments } from "../redux/patientDataSlice";
import { scheduleAppointment } from "../redux/appointmentsSlice";
import { Box, CircularProgress, Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AppointmentSchedulingPage = () => {
    // const appointments = [
    //     // Sample appointment data
    //     { id: "1", date: "2024-07-04", time: "10:00", doctor: "Dr. Smith" },
    //     { id: "2", date: "2024-07-05", time: "11:00", doctor: "Dr. Johnson" },
    // ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    const user = useSelector((state) => state.auth.user);
    const decodedToken = jwtDecode(user.token);
    const patientId = decodedToken.user.id;

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formSubmitting, setFormSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }
    
    if (error) {
        return <Box textAlign="center"><ErrorAlert message={error} /></Box>;
    }

    const handleFormSubmit = (data) => {
        setFormSubmitting(true);
        dispatch(scheduleAppointment(data)).then((response) => {
            if (response.type === "appointments/scheduleAppointment/fulfilled") {
                setSuccessMessage("Appointment successfully scheduled!");
                setErrorMessage("");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/dashboard");
                }, 3000); // Delay of 3 seconds
            } else {
                setFormSubmitting(false);
                setErrorMessage(response.payload.msg);
            }
        });
    };

    return (
        <Box p={3}>
            <CalendarView appointments={appointments} />
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <AppointmentForm onSubmit={handleFormSubmit} patientId={patientId} isSubmitting={formSubmitting} />
        </Box>
    );
};

export default AppointmentSchedulingPage;