import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patientDataReducer from "./patientDataSlice";
import doctorsReducer from "./doctorsSlice";
import appointmentsReducer from './appointmentsSlice';
import profileReducer from "./profileSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        patientData: patientDataReducer,
        doctors: doctorsReducer,
        appointments: appointmentsReducer,
        userProfile: profileReducer
    },
});

export default store;