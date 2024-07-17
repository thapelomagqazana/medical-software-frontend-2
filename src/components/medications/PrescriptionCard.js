import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PrescriptionCard = ({ prescription }) => (
    <Card sx={{ margin: 2, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
        <CardContent>
            <Typography variant="h6" color="primary">
                {prescription.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Dosage: {prescription.dosage}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Frequency: {prescription.frequency}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Prescribed by: Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
            </Typography>
        </CardContent>
    </Card>
);

export default PrescriptionCard;