import axiosInstance from '../AxiosConfig';

const adminService = {
    deactivateUser: (userId) => axiosInstance.post(`/admin/deactivate-user`, null, {params: {id: userId}}),
    activateUser: (userId) => axiosInstance.post(`/admin/activate-user`, null, {params: {id: userId}}),
    getReports: () => axiosInstance.get('/admin/reports'),
    getReportById: (reportId) => axiosInstance.get(`/admin/reports/${reportId}`),
    getReportsByUser: (userId) => axiosInstance.get(`/admin/reports-by-user/${userId}`)
};

export default adminService;