import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ErrorAlert from "../components/global/ErrorAlert";
import WelcomeMessage from "../components/dashboard/WelcomeMessage";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";
import { fetchUpcomingAppointments } from "../redux/patientDataSlice";
import { CircularProgress, Box } from '@mui/material';

const PatientDashboardPage = () => {
    const patientName = "John Doe"; // This would be fetched from user data
    // const appointments = [];
    // const appointments = [
    //     { id: "1", date: "2024-07-04", time: "10:00 AM", doctor: "Dr. Smith" },
    //     { id: "2", date: "2024-07-05", time: "11:00 AM", doctor: "Dr. Johnson" }
    // ];

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    // const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchUpcomingAppointments());
    }, [dispatch]);

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }
    
    if (error) {
        return <Box textAlign="center"><ErrorAlert message={error} /></Box>;
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