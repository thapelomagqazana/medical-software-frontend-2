import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const API_URL = "/patients";

// Async thunk for scheduling an appointment
export const scheduleAppointment = createAsyncThunk("appointments/scheduleAppointment",
    async ({ patientId, appointmentData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/${patientId}/appointments`, appointmentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk reschedule appointment
export const rescheduleAppointment = createAsyncThunk("appointments/rescheduleAppointment",
    async ({ patientId, appointmentId, newDate, newTimeSlot }, { rejectWithValue }) => {
    try {       
        const response = await axiosInstance.put(`${API_URL}/${patientId}/appointments/${appointmentId}`, {
            startTime: newTimeSlot.time,
            endTime: new Date(new Date(newTimeSlot.time).getTime() + 60 * 60 * 1000).toISOString(),
            date: newDate.toISOString()
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk cancel appointment
export const cancelAppointment = createAsyncThunk("appointments/cancel",
    async ({ patientId, appointmentId }, { rejectWithValue }) => {
    try {       
        const response = await axiosInstance.put(`${API_URL}/${patientId}/appointments/${appointmentId}`, {
            status: "cancelled"
        });
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
                state.error = null;
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
            })
            .addCase(cancelAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                const index = state.appointments.findIndex(appointment => appointment._id === action.payload._id);
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(cancelAppointment.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default appointmentsSlice.reducer;