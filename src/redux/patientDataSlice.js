import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/patient";

export const fetchAppointments = createAsyncThunk("patients/fetchAppointments", async  (_, { getState, rejectWithValue }) => {
    try {
        // Get token from the state or localStorage
        const token = localStorage.getItem("token");
        
        // Set up headers
        const config = {
            headers: {
                Authorization: `${token}`
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
            })
    },
});

export default patientDataSlice.reducer;