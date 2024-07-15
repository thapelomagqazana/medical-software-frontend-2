import React, { useState } from "react";
import { Grid, TextField, Box, Typography } from "@mui/material";
import PatientCard from "../components/patients/PatientCard";
import PatientDetailModal from "../components/patients/PatientDetailModal";

const PatientsPage = ({ patients }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Box mb={2}>
                <TextField
                    label="Search Patients"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                />
            </Box>
            <Grid container spacing={3}>
                {filteredPatients.map((patient) => (
                    <Grid item xs={12} sm={6} md={4} key={patient._id}>
                        <PatientCard patient={patient} onClick={() => setSelectedPatient(patient)} />
                    </Grid>
                ))}
            </Grid>
            {selectedPatient && (
                <PatientDetailModal 
                    patient={selectedPatient} 
                    open={!!selectedPatient} 
                    onClose={() => setSelectedPatient(null)}
                />
            )}
        </>
    );
};

export default PatientsPage;