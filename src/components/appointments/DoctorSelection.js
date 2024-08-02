import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/slices/doctorsSlice';

const DoctorSelection = ({ selectedDoctor, setSelectedDoctor }) => {
    const dispatch = useDispatch();
    const doctors = useSelector((state) => state.doctor.doctors);
    const loading = useSelector((state) => state.doctor.loading);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);
    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Doctor</InputLabel>
            <Select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                label="Doctor"
                disabled={loading}
            >
                {doctors.map((doctor) => (
                    <MenuItem key={doctor._id} value={doctor._id}>
                        Dr. {doctor.firstName} {doctor.lastName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DoctorSelection;
