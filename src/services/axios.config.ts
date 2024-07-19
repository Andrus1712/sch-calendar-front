import axios, { AxiosInstance } from 'axios';

const axiosConfig: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:1713',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosConfig;