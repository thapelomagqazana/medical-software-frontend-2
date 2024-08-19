import React from "react";
import SignUp from "../components/auth/SignUpForm";
import { Container, Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";

const PatientSignUpPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ paddingBottom: '150px', paddingTop: isMobile ? '50px' : '100px' }}>
            <Container maxWidth="sm" sx={{ mt: isMobile ? 4 : 8 }}>
                <Paper elevation={3} sx={{ p: isMobile ? 3 : 4, textAlign: 'center', boxShadow: 3 }}>
                    <Typography 
                        variant="h4"
                        mb={2}
                        gutterBottom 
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                    >
                        Create an Account
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Join us and streamline your medical processes.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <SignUp />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default PatientSignUpPage;
