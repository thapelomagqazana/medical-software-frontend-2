import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

/**
 * AppointmentCard component
 * 
 * This component displays details of an upcoming appointment.
 *
 * Props:
 * - appointment (object): An appointment object containing the following properties:
 *   - date (string): The date of the appointment.
 *   - time (string): The time of the appointment.
 *   - doctor (string): The name of the doctor for the appointment.
 *
 * Example usage:
 * <AppointmentCard appointment={{ date: "2024-07-04", time: "10:00 AM", doctor: "Dr. Smith" }} />
 */
const AppointmentCard = ({ appointment }) => (
    <Card sx={{ margin: 2, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                Date: {appointment.date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Time: {appointment.time}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Doctor: {appointment.doctor}
            </Typography>
            <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                View Details
            </Button>
        </CardContent>
    </Card>
);

/**
 * UpcomingAppointments component
 * 
 * This component displays a list of upcoming appointments using AppointmentCard components.
 * It shows a few recent appointments by default with options to view all, search, and filter.
 *
 * Props:
 * - appointments (array): An array of appointment objects. Each object should contain the following properties:
 *   - id (string): The unique identifier for the appointment.
 *   - date (string): The date of the appointment.
 *   - time (string): The time of the appointment.
 *   - doctor (string): The name of the doctor for the appointment.
 *
 * Example usage:
 * <UpcomingAppointments appointments={[
 *   { id: "1", date: "2024-07-04", time: "10:00 AM", doctor: "Dr. Smith" },
 *   { id: "2", date: "2024-07-05", time: "11:00 AM", doctor: "Dr. Johnson" }
 * ]} />
 */

const UpcomingAppointments = ({ appointments }) => {
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    return (
        <Card sx={{ margin: 2, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom>
                        Upcoming Appointments
                    </Typography>
                    <IconButton color="primary" onClick={() => navigate('/schedule-appointment')}>
                        <AddIcon />
                    </IconButton>
                </Box>
                {appointments.length === 0 ? (
                    <Box textAlign="center" my={4}>
                        <Typography variant="h6" color="textSecondary">
                            You have no upcoming appointments.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {appointments.map((appointment) => (
                            <Grid item xs={12} md={6} key={appointment.id}>
                                <AppointmentCard appointment={appointment} />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {appointments.length > 1 && (
                    <Box textAlign="center" mt={2}>
                        <Button variant="contained" onClick={() => setShowAll(!showAll)}>
                            {showAll ? "Show Less" : "View All"}
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default UpcomingAppointments;