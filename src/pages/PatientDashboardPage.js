import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import ErrorAlert from "../components/global/ErrorAlert";
import WelcomeMessage from "../components/dashboard/WelcomeMessage";
import SummaryOfAppointments from "../components/dashboard/SummaryOfAppointments";
import MedicationReminders from "../components/dashboard/MedicationReminders";
import LatestMessages from "../components/dashboard/LatestMessages";
import { fetchUpcomingAppointments } from "../redux/patientDataSlice";
import { fetchProfile } from "../redux/profileSlice";
import { fetchPrescriptions } from "../redux/medicationsSlice";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Box } from '@mui/material';

// Mock functions for rescheduling and canceling
const handleReschedule = (appointment) => {
    console.log('Reschedule appointment:', appointment);
};

const handleCancel = (appointment) => {
    console.log('Cancel appointment:', appointment);
};

const PatientDashboardPage = () => {
    // const appointments = [];
    // const appointments = [
    //     {
    //         _id: "1",
    //         patientId: "60c72b2f5f1b2c001c8e4b1a",
    //         doctorId: {
    //             _id: "doctor1",
    //             firstName: "Alice",
    //             lastName: "Smith"
    //         },
    //         startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    //         endTime: new Date(new Date().setDate(new Date().getDate() + 1) + 3600000).toISOString(), // 1 hour later
    //         reason: "General Checkup",
    //         status: "scheduled"
    //     },
    //     {
    //         _id: "2",
    //         patientId: "60c72b2f5f1b2c001c8e4b1a",
    //         doctorId: {
    //             _id: "doctor2",
    //             firstName: "Bob",
    //             lastName: "Johnson"
    //         },
    //         startTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    //         endTime: new Date(new Date().setDate(new Date().getDate() + 3) + 3600000).toISOString(),
    //         reason: "Follow-up",
    //         status: "pending"
    //     },
    //     {
    //         _id: "3",
    //         patientId: "60c72b2f5f1b2c001c8e4b1a",
    //         doctorId: {
    //             _id: "doctor3",
    //             firstName: "Carol",
    //             lastName: "Williams"
    //         },
    //         startTime: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    //         endTime: new Date(new Date().setDate(new Date().getDate() + 5) + 3600000).toISOString(),
    //         reason: "Dental Cleaning",
    //         status: "completed"
    //     }
    // ];
    

    // Sample hardcoded prescriptions for testing
    // const medications = [
    //     {
    //         id: "1",
    //         name: "Aspirin",
    //         dosage: "100mg",
    //         frequency: "Once daily",
    //         doctor: {
    //             firstName: "John",
    //             lastName: "Doe"
    //         }
    //     },
    //     {
    //         id: "2",
    //         name: "Metformin",
    //         dosage: "500mg",
    //         frequency: "Twice daily",
    //         doctor: {
    //             firstName: "Jane",
    //             lastName: "Smith"
    //         }
    //     },
    //     {
    //         id: "3",
    //         name: "Lisinopril",
    //         dosage: "20mg",
    //         frequency: "Once daily",
    //         doctor: {
    //             firstName: "Robert",
    //             lastName: "Brown"
    //         }
    //     }
    // ];

    // Mock data for medications
    const medications = [
        {
            _id: "1",
            name: "Aspirin",
            dosage: "100mg",
            time: "08:00 AM",
            taken: false,
        },
        {
            _id: "2",
            name: "Vitamin D",
            dosage: "50mg",
            time: "12:00 PM",
            taken: false,
        },
        {
            _id: "3",
            name: "Metformin",
            dosage: "500mg",
            time: "06:00 PM",
            taken: false,
        }
    ];

    // Mock data for messages
    const messages = [
        {
            _id: "1",
            doctorName: "Dr. Alice Smith",
            content: "Please remember to take your medication before breakfast.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            read: false,
        },
        {
            _id: "2",
            doctorName: "Dr. Bob Johnson",
            content: "Your lab results are ready. Please check the portal.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            read: false,
        },
        {
            _id: "3",
            doctorName: "Dr. Carol Williams",
            content: "We need to reschedule your appointment to next week.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
            read: true,
        },
        {
            _id: "4",
            doctorName: "Dr. Daniel Brown",
            content: "How are you feeling after the last treatment?",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
            read: true,
        },
        {
            _id: "5",
            doctorName: "Dr. Emily White",
            content: "Your prescription for Metformin has been updated.",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
            read: true,
        }
    ];


    // Mock functions for marking as taken and reordering
    const handleMarkAsTaken = (medication) => {
        console.log('Mark as taken:', medication);
    };

    const handleReorder = (medication) => {
        console.log('Reorder medication:', medication);
    };

    const handleReply = (message) => {
        console.log('Reply to message:', message);
    };
    
    const handleMarkAsRead = (message) => {
        console.log('Mark as read:', message);
    };

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    // const { loading, error } = useSelector((state) => state.patientData);
    const user = useSelector((state) => state.auth.user);
    const { profile } = useSelector((state) => state.userProfile);
    // const { medications } = useSelector((state) => state.medications);
    // console.log(user);
    // console.log();
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    const patientId = decodedToken.user.id;
    // console.log(patientId);

    useEffect(() => {
        if (user && decodedToken) {
            dispatch(fetchUpcomingAppointments(patientId));
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
                <WelcomeMessage name={`${profile.firstName} ${profile.lastName}`} message={"Here are your latest health updates"} appointmentsCount={appointments.length} newMessagesCount={messages.length} />
                <SummaryOfAppointments 
                    appointments={appointments} 
                    onReschedule={handleReschedule} 
                    onCancel={handleCancel} 
                />
                {/* <AppointmentsOverview appointments={appointments} /> */}
                {/* <MedicationsOverview medications={medications} /> */}
                <MedicationReminders medications={medications} onMarkAsTaken={handleMarkAsTaken} onReorder={handleReorder} />
                {/* <MessagesOverview messages={messages} /> */}
                <LatestMessages messages={messages} onReply={handleReply} onMarkAsRead={handleMarkAsRead} />
            </Container>
        </>
    );
};

export default PatientDashboardPage;