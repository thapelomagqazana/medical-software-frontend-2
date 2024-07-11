import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <Box mb={2}>
            <TextField
                fullWidth
                variant="outlined"
                label="Search Appointments"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </Box>
    );
};

export default SearchBar;
