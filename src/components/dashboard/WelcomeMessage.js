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
const WelcomeMessage = ({ name, message, appointmentsCount, newMessagesCount }) => {
    // Determine the greeting based on the current time of the day
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return "Good morning";
        if (currentHour < 18) return "Good afternoon";
        return "Good evening";
    };

    const greeting = getGreeting();
    return (
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
                {greeting}, {name}
            </Typography>
            <Typography 
                variant="subtitle1" 
                component="p" 
                color="textSecondary"
                sx={{ fontStyle: 'italic', mb: 2 }}
            >
                {message}
            </Typography>
            <Typography 
                variant="body1" 
                component="p" 
                color="textPrimary"
            >
                You have {appointmentsCount} upcoming appointment{appointmentsCount !== 1 ? 's' : ''} and {newMessagesCount} new message{newMessagesCount !== 1 ? 's' : ''}.
            </Typography>

        </Box>
    );
};


export default WelcomeMessage;
