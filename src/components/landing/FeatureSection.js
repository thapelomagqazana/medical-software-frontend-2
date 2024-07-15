import React from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';

const features = [
    {
        icon: <MedicalServicesIcon fontSize="large" color="primary" />,
        title: 'Track Medical Appointments',
        description: 'Manage appointments, schedules, and lab results seamlessly.'
    },
    {
        icon: <ScheduleIcon fontSize="large" color="primary" />,
        title: 'Facilitate Doctor-Patient Communication',
        description: 'Enable efficient and effective communication between doctors and patients.'
    },
    {
        icon: <HealthAndSafetyIcon fontSize="large" color="primary" />,
        title: 'Chronic Illness Management',
        description: 'Help patients manage their chronic illnesses with digital care plans.'
    },
    {
        icon: <PharmacyIcon fontSize="large" color="primary" />,
        title: 'Connect with Pharmacies',
        description: 'Easily order prescriptions and connect with nearby pharmacies.'
    }
];

const FeaturesSection = () => {
    return (
        <Box py={8} bgcolor="background.default">
            <Typography variant="h4" align="center" gutterBottom>
                Features
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper 
                            sx={{ 
                                padding: 4, 
                                textAlign: 'center',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 3,
                                }
                            }}
                        >
                            <Box mb={2}>{feature.icon}</Box>
                            <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                            <Typography color="textSecondary">{feature.description}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeaturesSection;
