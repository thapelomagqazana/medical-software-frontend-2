import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const API_URL = '/patients';

export const fetchProfile = createAsyncThunk(
    "patientProfile/fetchProfile", async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/${userId}/profile`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
});

const patientProfileSlice = createSlice({
    name: "patientProfile",
    initialState: {
        profile: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default patientProfileSlice.reducer;