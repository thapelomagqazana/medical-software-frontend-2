import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

// Async thunk for scheduling an appointment
export const scheduleAppointment = createAsyncThunk("appointments/scheduleAppointment", async (appointmentData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(API_URL, appointmentData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for updating an appointment
export const updateAppointment = createAsyncThunk(
    "appointments/updateAppointment", async ({ id, startTime, endTime, patientId, doctorId, status }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put(
                `${API_URL}/${id}`,
                { startTime, endTime, patientId, doctorId, status },
                config
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
});

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(scheduleAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(scheduleAppointment.fulfilled, (state, action) => {
                state.appointments.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(scheduleAppointment.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const index = state.appointments.findIndex(appointment => appointment._id === action.payload._id);

                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateAppointment.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default appointmentsSlice.reducer;