import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const MessagesOverview = ({ messages }) => (
    <Card sx={{ margin: 2, boxShadow: 3 }}>
        <CardContent>
            <Box mb={4}>
                <Typography variant="h5" mb={2} sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Recent Messages
                </Typography>
                <Grid container spacing={3}>
                    {messages.map((message) => (
                        <Grid item xs={12} md={6} key={message.id}>
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
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        From: Dr. {message.doctorName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {message.content}
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

export default MessagesOverview;