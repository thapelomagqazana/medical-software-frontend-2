import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const FilterOptions = ({ filter, setFilter }) => {
    return (
        <Box mb={2}>
            <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="scheduled">Scheduled</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FilterOptions;
