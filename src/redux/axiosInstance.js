import axios from "axios";
import store from "./store";
import { logout } from "./slices/authSlice";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;