import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";

/**
 * AppointmentForm component
 * 
 * This component provides a form for creating, rescheduling, or canceling appointments.
 * It supports actions like adding new appointments, updating existing ones, and deleting appointments.
 *
 * Props:
 * - onSubmit (function): Function to handle the form submission.
 * - initialData (object): Initial data for the form fields (optional).
 * 
 * Example usage:
 * <AppointmentForm onSubmit={handleFormSubmit} initialData={initialAppointmentData} />
 */
const AppointmentForm = ({ onSubmit, initialData = {} }) => {
    const [date, setDate] = useState(initialData.data || "");
    const [time, setTime] = useState(initialData.time || "");
    const [doctor, setDoctor] = useState(initialData.doctor || "");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ date, time, doctor });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} mt={4} p={2} boxShadow={3} borderRadius={2} maxWidth="400px" mx="auto">
            <Typography variant="h6" mb={2}>Schedule Appointment</Typography>
            <TextField 
                label="Date"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField 
                label="Time"
                type="time"
                fullWidth
                value={time}
                onChange={(e) => setTime(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField 
                label="Doctor"
                fullWidth
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                margin="normal"
                select
            >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
                <MenuItem value="Dr. Lee">Dr. Lee</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {initialData.id ? 'Update Appointment' : 'Create Appointment'}
            </Button>
        </Box>
    );
};

export default AppointmentForm;