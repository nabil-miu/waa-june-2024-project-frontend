import axiosInstance from '../AxiosConfig';

const userService = {
    getAllUsers: () => axiosInstance.get('/users/all'),
    getUserById: (id) => axiosInstance.get(`/users/${id}`),
    createUser: (user) => axiosInstance.post('/users', user),
    updateUser: (id, user) => axiosInstance.put(`/users/${id}`, user),
    deleteUser: (id) => axiosInstance.delete(`/users/${id}`),
    reportUser: (userId, report) => axiosInstance.post(`/users/${userId}/report`, report),
    blockUser: (blockedId, data) => axiosInstance.post(`/users/${blockedId}/block`, data),
    unblockUser: (blockedId, data) => axiosInstance.post(`/users/${blockedId}/unblock`, data),
};

export default userService;