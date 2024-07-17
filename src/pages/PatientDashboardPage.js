import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import ErrorAlert from "../components/global/ErrorAlert";
import WelcomeMessage from "../components/dashboard/WelcomeMessage";
import AppointmentsOverview from "../components/dashboard/AppointmentsOverview";
import MedicationsOverview from "../components/dashboard/MedicationsOverview";
import MessagesOverview from "../components/dashboard/MessagesOverview";
import { fetchUpcomingAppointments } from "../redux/patientDataSlice";
import { fetchProfile } from "../redux/profileSlice";
import { fetchPrescriptions } from "../redux/medicationsSlice";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Box } from '@mui/material';

const PatientDashboardPage = () => {
    // const patientName = "John Doe"; // This would be fetched from user data
    // const appointments = [];
    // const appointments = [
    //     { id: "1", date: "2024-07-04", time: "10:00 AM", doctor: "Dr. Smith" },
    //     { id: "2", date: "2024-07-05", time: "11:00 AM", doctor: "Dr. Johnson" }
    // ];

    // Sample hardcoded prescriptions for testing
    const medications = [
        {
            id: "1",
            name: "Aspirin",
            dosage: "100mg",
            frequency: "Once daily",
            doctor: {
                firstName: "John",
                lastName: "Doe"
            }
        },
        {
            id: "2",
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            doctor: {
                firstName: "Jane",
                lastName: "Smith"
            }
        },
        {
            id: "3",
            name: "Lisinopril",
            dosage: "20mg",
            frequency: "Once daily",
            doctor: {
                firstName: "Robert",
                lastName: "Brown"
            }
        }
    ];
    const messages = [
        { id: 1, doctorName: 'Smith', content: 'Your lab results are ready.' },
        { id: 2, doctorName: 'Johnson', content: 'Please schedule a follow-up appointment.' },
    ];

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    const user = useSelector((state) => state.auth.user);
    const { profile } = useSelector((state) => state.userProfile);
    // const { medications } = useSelector((state) => state.medications);
    const decodedToken = jwtDecode(user.token);

    const patientId = decodedToken.user.id;

    useEffect(() => {
        if (user && decodedToken) {
            dispatch(fetchUpcomingAppointments());
            dispatch(fetchProfile(patientId));
            // dispatch(fetchPrescriptions(patientId));
        }
        
    }, [dispatch, user]);

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }
    
    if (error) {
        return <Box textAlign="center"><ErrorAlert message={error} /></Box>;
    }

    return (
        <>
            <Container maxWidth="lg">
                <WelcomeMessage name={`${profile.firstName} ${profile.lastName}`} message={"Here are your latest health updates"} />
                <AppointmentsOverview appointments={appointments} />
                <MedicationsOverview medications={medications} />
                <MessagesOverview messages={messages} />
            </Container>
        </>
    );
};

export default PatientDashboardPage;