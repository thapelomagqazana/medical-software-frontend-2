import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const API_URL = "/patients";

export const fetchUpcomingAppointments = createAsyncThunk(
    "patients/fetchUpcomingAppointments", async  (userId, { getState, rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${userId}/appointments/upcoming`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAppointments = createAsyncThunk(
    "patients/fetchAppointments", async  (_, { getState, rejectWithValue }) => {
    try {
        // Get token from the state or localStorage
        const token = localStorage.getItem("token");
        
        // Set up headers
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        const response = await axios.get(`${API_URL}/appointments`, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const patientDataSlice = createSlice({
    name: "patientData",
    initialState: {
        appointments: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcomingAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUpcomingAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
                state.loading = false;
            })
            .addCase(fetchUpcomingAppointments.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
                state.loading = false;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default patientDataSlice.reducer;