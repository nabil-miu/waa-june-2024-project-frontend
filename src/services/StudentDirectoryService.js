import axiosInstance from '../AxiosConfig';

const StudentDirectoryService = {
    getAllDirectories: () => axiosInstance.get('/students-directory/all'),
    getDirectoryById: (id) => axiosInstance.get(`/students-directory/${id}`),
    createDirectory: (newDirectory) => axiosInstance.post('/students-directory', newDirectory),
    updateDirectory: (id, updatedDirectory) => axiosInstance.put(`/students-directory/${id}`, updatedDirectory),
    deleteDirectory: (id) => axiosInstance.delete(`/students-directory/${id}`),
    searchDirectories: (params) => axiosInstance.get('/students-directory/search', { params }),
    getDirectoriesByPage: (page, size) => axiosInstance.get(`/students-directory/pages/${page}`, { params: { size } })
};

export default StudentDirectoryService;
