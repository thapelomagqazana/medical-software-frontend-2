import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/patientDataSlice";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AppointmentTable from "../components/appointments/AppointmentTable";
import SearchBar from "../components/appointments/SearchBar";
import FilterOptions from "../components/appointments/FilterOptions";
import Pagination from "../components/appointments/Pagination";

const YourAppointmentsPage = () => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.patientData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const filteredAppointments = appointments.filter(appointment => {
        return (
            appointment.doctorId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorId.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formatDate(appointment.startTime).includes(searchTerm) ||
            formatTime(appointment.startTime).includes(searchTerm) ||
            formatTime(appointment.endTime).includes(searchTerm)
        ) && (filter === "" || appointment.status === filter);
    });

    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    const paginatedAppointments = filteredAppointments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }
    
    if (error) {
        return <Box textAlign="center"><Alert severity="error">{error}</Alert></Box>;
    }

    return (
        <>
            <Header />
            <Box p={3}>
                <Typography variant="h4" gutterBottom align="center">Your Appointments</Typography>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <FilterOptions filter={filter} setFilter={setFilter} />
                <AppointmentTable appointments={paginatedAppointments} />
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </Box>
            <Footer />
        </>
    );
};

const formatTime = (time) => {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

export default YourAppointmentsPage;
