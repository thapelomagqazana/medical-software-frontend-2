import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import CalendarView from '../components/appointments/CalendarView';
import AvailableTimeSlots from '../components/appointments/AvailableTimeSlots';
import ConfirmationModal from '../components/appointments/ConfirmationModal';
import { format } from 'date-fns';

const AppointmentScheduling = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([
        { time: '09:00 AM', selected: false },
        { time: '10:00 AM', selected: false },
        { time: '11:00 AM', selected: false },
        // Add more time slots as needed
    ]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [specialRequest, setSpecialRequest] = useState('');

    const handleSelectSlot = (slot) => {
        setAvailableSlots((slots) => slots.map(s => ({ ...s, selected: s.time === slot.time })));
        setSelectedSlot({ ...slot, date: format(selectedDate, 'PPP') });
        setConfirmationModalOpen(true);
    };

    const handleConfirm = () => {
        console.log('Appointment Confirmed', selectedSlot, specialRequest);
        setConfirmationModalOpen(false);
    };

    const handleSpecialRequestChange = (e) => {
        setSpecialRequest(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h4" textAlign="center" my={4} sx={{ fontWeight: 'bold', color: 'primary.main' }}>Schedule an Appointment</Typography>
            <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} availableDates={[new Date()]} />
            {selectedDate && <AvailableTimeSlots selectedDate={selectedDate} availableSlots={availableSlots} onSelectSlot={handleSelectSlot} />}
            <ConfirmationModal
                open={confirmationModalOpen}
                handleClose={() => setConfirmationModalOpen(false)}
                selectedSlot={selectedSlot}
                handleConfirm={handleConfirm}
                handleSpecialRequestChange={handleSpecialRequestChange}
            />
        </Container>
    );
};

export default AppointmentScheduling;
