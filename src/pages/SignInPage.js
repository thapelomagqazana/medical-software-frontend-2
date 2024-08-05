/**
 * Importing necessary components.
 * - React: A JavaScript library for building user interfaces.
 * - Header, SignIn, Footer: Custom components for different sections of the sign-up page.
 */
import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import SignIn from "../components/auth/SignInForm";


/**
 * SignUpPage component.
 * - Combines the header, sign-in form, and footer sections.
 * - Uses React fragments (<></>) to group multiple elements.
 */

const SignInPage = () => {
    return (
        <Box sx={{ paddingBottom: '150px' }}>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', boxShadow: 3 }}>
                    <Typography 
                        variant="h3"
                        mb={2}
                        gutterBottom 
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Sign in to your account
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <SignIn />
                    </Box>
                </Paper>
            </Container>
        </Box>

    );
};

export default SignInPage;