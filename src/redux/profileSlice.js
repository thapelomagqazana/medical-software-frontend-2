import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/patients';

export const fetchProfile = createAsyncThunk(
    "patientProfile/fetchProfile", async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/${userId}/profile`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);

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