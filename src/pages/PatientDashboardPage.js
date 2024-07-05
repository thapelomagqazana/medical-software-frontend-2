import React from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeMessage from "../components/WelcomeMessage";
import UpcomingAppointments from "../components/UpcomingAppointments";

const PatientDashboardPage = () => {
    const patientName = "John Doe"; // This would be fetched from user data
    // const appointments = [];
    const appointments = [
        { id: "1", date: "2024-07-04", time: "10:00 AM", doctor: "Dr. Smith" },
        { id: "2", date: "2024-07-05", time: "11:00 AM", doctor: "Dr. Johnson" }
    ];

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