import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * WelcomeMessage component
 * 
 * This component displays a welcome message for the user with their name and a subtitle.
 *
 * Props:
 * - name (string): The name of the user to be displayed in the welcome message.
 * - message (string): A custom welcome message.
 *
 * Example usage:
 * <WelcomeMessage name="John Doe" message="Here are your latest health updates" />
 */
const WelcomeMessage = ({ name, message }) => (
    <Box 
        textAlign="center" 
        my={{ xs: 2, md: 4 }} 
        p={{ xs: 2, md: 4 }} 
        bgcolor="background.paper" 
        borderRadius={2} 
        boxShadow={3}
    >
        <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
            Welcome, {name}
        </Typography>
        <Typography 
            variant="subtitle1" 
            component="p" 
            color="textSecondary"
            sx={{ fontStyle: 'italic' }}
        >
            {message}
        </Typography>
    </Box>
);

export default WelcomeMessage;
