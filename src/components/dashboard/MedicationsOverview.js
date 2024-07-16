import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const MedicationsOverview = ({ medications }) => (
    <Card sx={{ margin: 2, boxShadow: 3 }}>
        <CardContent>
            <Box mb={4}>
                <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Current Medications
                </Typography>
                <Grid container spacing={3}>
                    {medications.map((medication) => (
                        <Grid item xs={12} sm={6} md={4} key={medication.id}>
                            <Card 
                                sx={{ 
                                        boxShadow: 3, 
                                        transition: '0.3s', 
                                        '&:hover': { 
                                            boxShadow: 6 
                                        },
                                        height: '100%' 
                                    }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                        {medication.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Dosage: {medication.dosage}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </CardContent>
    </Card>
    
);

export default MedicationsOverview;