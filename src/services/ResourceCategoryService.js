import axiosInstance from '../AxiosConfig';

const getResourceCategories = () => {
  return axiosInstance.get('/categories/all');
};

const getResourceCategory = (id) => {
  return axiosInstance.get(`/categories/${id}`);
};

const createResourceCategory = (resourceCategory) => {
  return axiosInstance.post('/categories', resourceCategory);
};

const updateResourceCategory = (id, resourceCategory) => {
  return axiosInstance.put(`/categories/${id}`, resourceCategory);
};

const deleteResourceCategory = (id) => {
  return axiosInstance.delete(`/categories/${id}`);
};

export default {
  getResourceCategories,
  getResourceCategory,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
};