import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, MenuItem, Typography, CircularProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fetchDoctors } from "../../redux/doctorsSlice";

// Validation schema using Yup
const validationSchema = Yup.object({
    startTime: Yup.string().required("Start time is required"),
    doctorId: Yup.string().required("Doctor is required"),
    status: Yup.string().required("Status is required"),
});

// Function to format date to "yyyy-MM-ddThh:mm"
const formatDateToLocalInput = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(d.getUTCDate()).padStart(2, '0');
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

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
const AppointmentForm = ({ onSubmit, initialData = {}, patientId, isSubmitting }) => {
    const dispatch = useDispatch();
    const { doctors, loading, error } = useSelector((state) => state.doctors);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);
    return (
        <Formik
            initialValues={{
                startTime: initialData.startTime ? formatDateToLocalInput(initialData.startTime) : "",
                endTime: initialData.endTime ? formatDateToLocalInput(initialData.endTime) : "",
                doctorId: initialData.doctorId || "",
                status: initialData.status || "scheduled",
                patientId: patientId || initialData.patientId || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const startTime = new Date(values.startTime);
                const offset = startTime.getTimezoneOffset() * 60000; // offset in milliseconds
                const localStartTime = new Date(startTime.getTime() - offset);
                const endTime = new Date(localStartTime.getTime() + 90 * 60 * 1000); // Add 90 minutes
                values.startTime = localStartTime.toISOString(); // Use localStartTime
                values.endTime = endTime.toISOString();
                // console.log(values);
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ errors, touched }) => (
                <Box component={Form} mt={4} p={2} boxShadow={3} borderRadius={2} maxWidth="400px" mx="auto">
                    <Typography variant="h6" mb={2} align="center" sx={{ fontWeight: "bold", color: 'primary.main' }}>Schedule Appointment</Typography>
                    <Field
                        as={TextField}
                        label="Start Time"
                        name="startTime"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.startTime && !!errors.startTime}
                        helperText={touched.startTime && errors.startTime}
                    />
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">Error loading doctors</Typography>
                    ) : (
                        <Field
                            as={TextField}
                            label="Doctor"
                            name="doctorId"
                            fullWidth
                            margin="normal"
                            select
                            error={touched.doctorId && !!errors.doctorId}
                            helperText={touched.doctorId && errors.doctorId}
                        >
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor._id} value={doctor._id}>
                                    Dr. {doctor.firstName} {doctor.lastName}
                                </MenuItem>
                            ))}
                        </Field>
                    )}
                    {/* <Field
                        as={TextField}
                        label="Status"
                        name="status"
                        fullWidth
                        margin="normal"
                        select
                        error={touched.status && !!errors.status}
                        helperText={touched.status && errors.status}
                    >
                        <MenuItem value="scheduled">Scheduled</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </Field> */}
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                        {initialData.id ? 'Update Appointment' : 'Create Appointment'}
                    </Button>
                </Box>
            )}
        </Formik>
    );
};

export default AppointmentForm;