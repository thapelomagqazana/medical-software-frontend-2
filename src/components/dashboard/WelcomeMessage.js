import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * WelcomeMessage component
 * 
 * This component displays a welcome message for the user with their name and a subtitle.
 *
 * Props:
 * - name (string): The name of the user to be displayed in the welcome message.
 *
 * Example usage:
 * <WelcomeMessage name="John Doe" />
 */
const WelcomeMessage = ({ name }) => (
    <Box textAlign="center" my={4} p={2} bgcolor="background.paper" borderRadius={1} boxShadow={1}>
        <Typography variant="h4" component="h1" gutterBottom>
            Welcome, {name}
        </Typography>
        <Typography variant="subtitle1" component="p" color="textSecondary">
            Here are your latest health updates
        </Typography>
    </Box>
);

export default WelcomeMessage;