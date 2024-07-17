import React from "react";
import { Box, Typography, Avatar, Button, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import profileIcon from "../../assets/images/pexels-pixabay-256514.jpg";

const ProfileDisplay = ({ profile, onEdit }) => (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", textAlign: "center", mt: 4, borderRadius: 2 }}>
        <Box mb={2}>
            <Avatar 
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }} 
                src={profile.avatar || profileIcon} 
                alt={`${profile.firstName} ${profile.lastName}`} 
            />
            <Typography variant="h5" gutterBottom>
                {profile.firstName} {profile.lastName}
            </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {profile.email}
        </Typography>
        <Button 
            variant="contained" 
            color="primary" 
            startIcon={<EditIcon />} 
            onClick={onEdit} 
            sx={{ mt: 2, py: 1, px: 3 }}
        >
            Edit Profile
        </Button>
    </Paper>
);

export default ProfileDisplay;
