import React from "react";
import CalendarView from "../components/CalendarView";
import AppointmentForm from "../components/AppointmentForm";
import Header from "../components/Header";
import { Box, Typography } from "@mui/material";

const AppointmentSchedulingPage = () => {
    const appointments = [
        // Sample appointment data
        { id: "1", date: "2024-07-04", time: "10:00", doctor: "Dr. Smith" },
        { id: "2", date: "2024-07-05", time: "11:00", doctor: "Dr. Johnson" },
    ];

    const handleFormSubmit = (data) => {
        // Handle form submission logic here
        console.log("Form submitted:", data);
    };

    return (
        <Box p={3}>
            <Header />
            <Typography variant="h4" gutterBottom>Your Appointments</Typography>
            <CalendarView appointments={appointments} />
            <AppointmentForm onSubmit={handleFormSubmit} />
        </Box>
    );
};

export default AppointmentSchedulingPage;