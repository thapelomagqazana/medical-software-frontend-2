import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorSlots } from '../../redux/slices/doctorsSlice';
import { format } from 'date-fns';
import { fromZonedTime } from "date-fns-tz";

const timeZone = process.env.REACT_APP_TIME_ZONE;

const AvailableTimeSlots = ({ selectedDate, selectedDoctor, setSelectedTimeSlot }) => {
    const dispatch = useDispatch();
    const slots = useSelector((state) => state.doctor.slots[selectedDoctor] || []);
    const loading = useSelector((state) => state.doctor.loading);

    useEffect(() => {
        if (selectedDoctor) {
          dispatch(fetchDoctorSlots({ date: selectedDate.toISOString(), doctorId: selectedDoctor }));
        }
      }, [selectedDate, selectedDoctor, dispatch]);
      
    
    return (
        <Box p={2} borderRadius="8px" boxShadow={3} mt={3}>
            <Typography variant="h6" mb={2}>
                Available Time Slots for {format(selectedDate, 'PPP')}
            </Typography>
            <Box sx={{ maxHeight:"150px", overflowY: "auto" }}>
              <List>
                  {slots.map((slot, index) => {
                      const localTime = fromZonedTime(new Date(slot.time), timeZone);
                      return (
                          <ListItem button key={index} onClick={() => slot.available && setSelectedTimeSlot(slot)}>
                              <ListItemText primary={`${format(localTime, 'p')}`} />
                              <Chip label={slot.available ? 'Available' : 'Unavailable'} color={slot.available ? 'success' : 'default'} />
                          </ListItem>
                      );
                  })}
              </List>
            </Box>
        </Box>
    );
};

export default AvailableTimeSlots;
