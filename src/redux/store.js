import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patientDataReducer from "./patientDataSlice";
import doctorsReducer from "./doctorsSlice";
import appointmentsReducer from './appointmentsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        patientData: patientDataReducer,
        doctors: doctorsReducer,
        appointments: appointmentsReducer,
    },
});

export default store;