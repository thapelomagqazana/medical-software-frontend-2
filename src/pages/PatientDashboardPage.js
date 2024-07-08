import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeMessage from "../components/WelcomeMessage";
import UpcomingAppointments from "../components/UpcomingAppointments";
import { fetchAppointments } from "../redux/patientDataSlice";
import { CircularProgress, Box, Typography } from '@mui/material';

const PatientDashboardPage = () => {
    const patientName = "John Doe"; // This would be fetched from user data
    // const appointments = [];
    // const appointments = [
    //     { id: "1", date: "2024-07-04", time: "10:00 AM", doctor: "Dr. Smith" },
    //     { id: "2", date: "2024-07-05", time: "11:00 AM", doctor: "Dr. Johnson" }
    // ];

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    const user = useSelector((state) => state.auth.user);

    console.log(user);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }
    
    if (error) {
        return <Box textAlign="center"><Typography variant="h6" color="error">{error}</Typography></Box>;
    }

    

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <WelcomeMessage name={patientName} />
                <UpcomingAppointments appointments={appointments} />
            </Container>
            <Footer />
        </>
    );
};

export default PatientDashboardPage;