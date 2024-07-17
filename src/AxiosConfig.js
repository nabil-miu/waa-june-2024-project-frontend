import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // replace with your API base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRQY2hXZ0dtUmJJcFUtNWhNRTdvbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1qNHhqZWhuNWNnMGhhenlsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiI2YmRIcEladkxyUnY0bkZhZU1ZYVRxTUVNME4zQVBLYkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtajR4amVobjVjZzBoYXp5bC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcyMTIyMjAyMywiZXhwIjoxNzIyMDg2MDIzLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiI2YmRIcEladkxyUnY0bkZhZU1ZYVRxTUVNME4zQVBLYiJ9.kD3Mzd9nUfyXZaJwguK0Uo1VMOPjtNElUgy0uZGsz6olDW5AD5Z5DPIaBwFX7Mlz0IvzSsf0Ht_ZrA1OJNyLiWlFYHd7S0RojNtPEE9aS2tQl978rpjyxczkYAMLkgXXhrXM78sSHPsTLizvxIdUkK2q5at0L9yPSXUTW5q-0xx6nJqSVWaOYJakgCW2P22ctAW-wv6xk6ai5iesupfSQ9cFO-_iuQLtU8uqrmZvkjoYuJ_KrvtAwDZdXagrhH_WamX5fYeeAFsgKkNB3NJLquwYw4gdL8gT__HPVRHGQuERFHFPEIisJmCQLCczyG2v5smP8F9vZZqaUez_ltUJ1Q";
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
