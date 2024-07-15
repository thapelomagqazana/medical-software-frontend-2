import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const PatientCard = ({ patient, onClick }) => (
    <Card onClick={onClick} sx={{ cursor: "pointer" }}>
        <CardContent>
            <Typography variant="h6">{patient.firstName} {patient.lastName}</Typography>
            <Typography variant="body2">Age: </Typography>
            <Typography variant="body2">Last Appointment: </Typography>
        </CardContent>
    </Card>
);

export default PatientCard;