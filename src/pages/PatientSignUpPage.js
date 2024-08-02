// Importing necessary libraries and components
import React from "react";
import SignUp from "../components/auth/SignUpForm";
import { Container, Box, Typography, Paper } from "@mui/material";

/**
 * SignUpPage is a React functional component that renders the sign-up page of the application.
 * It includes a header, a sign-up form, and a footer.
 */
const PatientSignUpPage = () => {
    return (
        <Box sx={{ paddingBottom: '150px' }}>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', boxShadow: 3 }}>
                    <Typography variant="h3" gutterBottom>
                        Create an account
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
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

// Exporting the SignUpPage component as the default export of this module.
export default PatientSignUpPage;