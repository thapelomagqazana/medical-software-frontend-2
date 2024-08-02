import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CalendarView = ({ selectedDate, setSelectedDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const renderHeader = () => (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <IconButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6">
                {format(currentMonth, 'MMMM yyyy')}
            </Typography>
            <IconButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRightIcon />
            </IconButton>
        </Box>
    );

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
            <Grid container spacing={1}>
                {days.map((day, index) => (
                    <Grid item xs={12 / 7} key={index} onClick={() => setSelectedDate(day)}>
                        <Box
                            textAlign="center"
                            p={2}
                            bgcolor={isSameDay(day, selectedDate) ? 'primary.main' : 'background.paper'}
                            color={isSameDay(day, selectedDate) ? 'white' : isSameMonth(day, currentMonth) ? 'text.primary' : 'text.disabled'}
                            borderRadius="4px"
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                        >
                            {format(day, 'd')}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <Box p={2} borderRadius="8px" boxShadow={3}>
            {renderHeader()}
            {renderDays()}
        </Box>
    );
};

export default CalendarView;
