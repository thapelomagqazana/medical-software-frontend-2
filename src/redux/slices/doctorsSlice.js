import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import axios from "axios";

const API_URL = "/doctors";

export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchDoctorSlots = createAsyncThunk("doctor/fetchDoctorSlots", async ({ date, doctorId }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/slots`, {
            params: { date, doctorId },
        });
        return { doctorId, slots: response.data.slots };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchPatients = createAsyncThunk("doctors/fetchPatients", 
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/patients`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
});

const doctorsSlice = createSlice({
    name: "doctor",
    initialState: {
        doctors: [],
        slots: {},
        patients: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDoctors.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchDoctors.fulfilled, (state, action) => {
            state.doctors = action.payload;
            state.loading = false;
        })
        .addCase(fetchDoctors.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(fetchPatients.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPatients.fulfilled, (state, action) => {
            state.patients = action.payload;
            state.loading = false;
        })
        .addCase(fetchPatients.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(fetchDoctorSlots.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchDoctorSlots.fulfilled, (state, action) => {
            state.loading = false;
            state.slots[action.payload.doctorId] = action.payload.slots;
        })
        .addCase(fetchDoctorSlots.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default doctorsSlice.reducer;