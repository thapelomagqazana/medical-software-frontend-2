import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import PrescriptionCard from "../medications/PrescriptionCard";

const MedicationsOverview = ({ medications }) => {
    return (
        <Card sx={{ margin: 2, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: 'primary.main' }} gutterBottom>
                        Current Medications and Prescriptions
                    </Typography>
                </Box>
                {medications.length === 0 ? (
                        <Box textAlign="center" my={4}>
                            <Typography variant="h6" color="textSecondary">
                                You have no medications or prescriptions.
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {medications.map((medication) => (
                                <Grid item xs={12} sm={6} md={4} key={medication.id}>
                                    <PrescriptionCard prescription={medication} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
            </CardContent>
        </Card>
        
    );   
};

export default MedicationsOverview;