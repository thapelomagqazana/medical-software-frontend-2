import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, CircularProgress, Grid, Tabs, Tab, Button } from '@mui/material';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import PatientsPage from './PatientsPage';
import { fetchPatients } from '../redux/doctorsSlice';

const DoctorDashboard = () => {
    const dispatch = useDispatch();
    const { patients, loading: patientsLoading, error: patientsError } = useSelector((state) => state.doctors);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    if (patientsLoading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }

    if (patientsError) {
        return <Box textAlign="center"><Typography variant="h6" color="error">{patientsError}</Typography></Box>;
    }

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
                <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab label="Patients" />
                    <Tab label="Appointments" />
                    <Tab label="Medical Records" />
                    <Tab label="Messages" />
                </Tabs>
                <Box mt={3}>
                    {tabIndex === 0 && <PatientsPage patients={patients} />}
                    {/* {tabIndex === 1 && <AppointmentsPage appointments={appointments} />}
                    {tabIndex === 2 && <MedicalRecordsPage />}
                    {tabIndex === 3 && <MessagesPage />} */}
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default DoctorDashboard;
