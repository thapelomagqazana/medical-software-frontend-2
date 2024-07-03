import React from "react";
import styled from "@emotion/styled/macro";
import { Grid, Typography, Box } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HealthAndSafetyIcon  from "@mui/icons-material/HealthAndSafety";
import PharmacyIcon from "@mui/icons-material/LocalPharmacy";

const FeaturesContainer = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9;

    @media (max-width: 768px) {
        padding: 30px 10px;
    }
`;

const FeatureItem = styled.div`
    text-align: center;
    margin: 20px;
`;

const features = [
    {
        icon: <MedicalServicesIcon fontSize="large"/>,
        title: "Track Medical Appointments",
        description: "Manage appointments, schedules, and lab results seamlessly."
    },
    {
        icon: <ScheduleIcon fontSize="large" />,
        title: "Facilitate Doctor-Patient Communication",
        description: "Enable efficient and effective communication between doctors and patients."
    },
    {
        icon: <HealthAndSafetyIcon fontSize="large" />,
        title: "Chronic Illness Management",
        description: "Help patients manage their chronic illnesses with digital care plans."
    },
    {
        icon: <PharmacyIcon fontSize="large" />,
        title: "Connect with Pharmacies",
        description: "Easily order prescriptions and connect with nearby pharmacies."
    }
];

const FeaturesSection = () => (
    <FeaturesContainer>
        <Typography variant="h4" gutterBottom align="center">Features</Typography>
        <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <FeatureItem>
                        <Box>{feature.icon}</Box>
                        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>{feature.title}</Typography>
                        <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>{feature.description}</Typography>
                    </FeatureItem>
                </Grid>
            ))}
        </Grid>
    </FeaturesContainer>
);

export default FeaturesSection;