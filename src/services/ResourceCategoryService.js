import axiosInstance from '../AxiosConfig';


const resourceCategories = {
  getResourceCategories: () => axiosInstance.get('/categories/all'),
  getResourceCategory: (id) => axiosInstance.get(`/categories/${id}`),
  createResourceCategory: (resourceCategory) => axiosInstance.post('/categories', resourceCategory),
  updateResourceCategory: (id, resourceCategory) => axiosInstance.put(`/categories/${id}`, resourceCategory),
  deleteResourceCategory: (id) => axiosInstance.delete(`/categories/${id}`),
};

export default resourceCategories;