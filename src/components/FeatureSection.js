/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled/macro": A library for writing CSS styles with JavaScript.
 * - Grid, Typography, Box from "@mui/material": Material-UI components.
 * - Icons from "@mui/icons-material": Material-UI icons for the feature items.
 */
import React from "react";
import styled from "@emotion/styled/macro";
import { Grid, Typography, Box } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HealthAndSafetyIcon  from "@mui/icons-material/HealthAndSafety";
import PharmacyIcon from "@mui/icons-material/LocalPharmacy";

/**
 * Styled component for the main container of the features section.
 * - padding: Adds space inside the container.
 * - background-color: Sets the background color.
 * - media query: Adjusts the padding for screens with a width of 768px or less.
 */
const FeaturesContainer = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9;

    @media (max-width: 768px) {
        padding: 30px 10px;
    }
`;

/**
 * Styled component for individual feature items.
 * - text-align: Centers the text inside the feature item.
 * - margin: Adds space around the feature item.
 */
const FeatureItem = styled.div`
    text-align: center;
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-10px);
    }
`;

/**
 * Array of feature objects, each containing an icon, title, and description.
 * - icon: The icon representing the feature.
 * - title: The title of the feature.
 * - description: A brief description of the feature.
 */
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

/**
 * Main component for the features section.
 * - FeaturesContainer: The main container for the section.
 * - Typography: The title of the section.
 * - Grid: A Material-UI component for creating a grid layout.
 * - FeatureItem: A styled component for each feature item.
 * - Box: A Material-UI component for layout control.
 * - features.map: Iterates over the features array to create a grid item for each feature.
 */
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