import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // replace with your API base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRQY2hXZ0dtUmJJcFUtNWhNRTdvbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1qNHhqZWhuNWNnMGhhenlsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiI2YmRIcEladkxyUnY0bkZhZU1ZYVRxTUVNME4zQVBLYkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtajR4amVobjVjZzBoYXp5bC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcyMTIzMDk0MCwiZXhwIjoxNzIyMDk0OTQwLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiI2YmRIcEladkxyUnY0bkZhZU1ZYVRxTUVNME4zQVBLYiJ9.a_IvfDazdMXko6MkZjuQWTQLyHbWU8pR-ZNLwMH8mRIzVASHQP6bczr7k8UQcv3LshVOJPx5d9N7WFl2GMrS394ADJjOSfB92CTUP52YXnBgXXx6tViCmdUZU6s6usHT-NEuUxC8uhempAwZCRVJIjOZUQXClYt-WMzUd0sMHOPy0r13gykx59uGm73oNw1W0KZs1vJynaRe1w9y9NfWZu92AVCjjSw_bZzPC3b6JhtIBrwJafJpVQlLPHzEhX0xxqgqhMj3Ry1Ww-V1_-PYPTgVa2_fO44FVRuij61U6hOyDOj-uSSiEq7guanPMCMKOGJJnS39dDZimHdQt9CDFg";
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
