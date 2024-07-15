import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // replace with your API base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRQY2hXZ0dtUmJJcFUtNWhNRTdvbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1qNHhqZWhuNWNnMGhhenlsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiI2YmRIcEladkxyUnY0bkZhZU1ZYVRxTUVNME4zQVBLYkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtajR4amVobjVjZzBoYXp5bC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcyMTA3MzAwOCwiZXhwIjoxNzIxOTM3MDA4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiI2YmRIcEladkxyUnY0bkZhZU1ZYVRxTUVNME4zQVBLYiJ9.lzKYqzAeg94uOTP5kLBuGwQ6A28ocWDW9NfAbzEGNBHYr2rIRfWZXGyek3MZnP5B8RBBYPJyJi_X3qJuv8wKyrEY7lMaXXKYwYamGngbihysJf-mOnBg3jfSziAlxzK_-ctGCQ0NxLZbOS1UqzkSHLK6NkyQhZQ0WcLCQtySSPHPH3-ZdQcGvFx-bjzrXUs79YV7ppvPbTRQt2MTOG5GKKuNnM7hPaet1Faf-u2KWRMYhfJcouTwLkEu9vPz23sA07jDaOFWLxYg06QFKNIjxFXi2sSVLRaeEIwYXlAS6eD3p-fFn-pj0OjqyKun3U5mQsAjsBHTwnwDwDm_vpxMGw";

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
