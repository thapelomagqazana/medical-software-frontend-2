import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";

const localizer = momentLocalizer(moment);

const CalendarView = ({ appointments }) => {
    const events = appointments.map(appointment => ({
        title: `Appointment with ${appointment.doctor}`,
        start: new Date(appointment.date + "T" + appointment.time),
        end: new Date(appointment.date + "T" + appointment.time),
    }));

    return (
        <Box>
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </Box>
    );
};

export default CalendarView;
