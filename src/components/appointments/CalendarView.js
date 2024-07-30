import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CalendarView = ({ selectedDate, setSelectedDate, availableDates }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const renderHeader = () => {
        return (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <IconButton onClick={handlePrevMonth}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">{format(currentMonth, 'MMMM yyyy')}</Typography>
                <IconButton onClick={handleNextMonth}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(startOfMonth(currentMonth));
        const endDate = endOfWeek(endOfMonth(currentMonth));

        let day = startDate;
        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }

        return (
            <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
                {days.map((day, index) => (
                    <Box
                        key={index}
                        onClick={() => handleDateClick(day)}
                        sx={{
                            padding: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: isSameMonth(day, currentMonth) ? (isSameDay(day, selectedDate) ? 'primary.main' : (availableDates.some(date => isSameDay(date, day)) ? 'success.light' : 'grey.300')) : 'grey.100',
                            color: isSameMonth(day, currentMonth) ? 'text.primary' : 'text.disabled',
                            borderRadius: 2
                        }}
                    >
                        {format(day, 'd')}
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <Box>
            {renderHeader()}
            {renderDays()}
        </Box>
    );
};

export default CalendarView;