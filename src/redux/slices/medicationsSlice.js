import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/patient";

export const fetchPrescriptions = createAsyncThunk("medications/fetchPrescriptions", 
    async (patientId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/${patientId}/prescriptions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

const medicationsSlice = createSlice({
    name: "medications",
    initialState: {
        medications: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrescriptions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPrescriptions.fulfilled, (state, action) => {
                state.medications = action.payload;
                state.loading = false;
            })
            .addCase(fetchPrescriptions.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default medicationsSlice.reducer;