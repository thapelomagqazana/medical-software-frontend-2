import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

// Async thunk for scheduling an appointment
export const scheduleAppointment = createAsyncThunk("appointments/scheduleAppointment", async (appointmentData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };

        const response = await axios.post(API_URL, appointmentData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for updating an appointment
export const rescheduleAppointment = createAsyncThunk(
    "appointments/rescheduleAppointment", async ({ id, startTime, endTime, patientId, doctorId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `${token}`,
                },
            };
            const response = await axios.put(
                `${API_URL}/${id}`,
                { startTime, endTime, patientId, doctorId },
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
            .addCase(rescheduleAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(rescheduleAppointment.fulfilled, (state, action) => {
                const index = state.appointments.findIndex(appointment => appointment._id === action.payload._id);

                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(rescheduleAppointment.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default appointmentsSlice.reducer;