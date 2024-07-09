import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/doctors";

export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async (_, { rejectWithValue }) => {
    try {
        // Get token from the state or localStorage
        const token = localStorage.getItem("token");
        
        // Set up headers
        const config = {
            headers: {
                Authorization: `${token}`
            }
        };

        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const doctorsSlice = createSlice({
    name: "doctors",
    initialState: {
        doctors: [],
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
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default doctorsSlice.reducer;