import axiosInstance from '../AxiosConfig';
import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const getResourceCategories = () => {
  return axios.get(baseURL+'/categories/all');
};

const getResourceCategory = (id) => {
  return axios.get(baseURL+`/categories/${id}`);
};

const createResourceCategory = (resourceCategory) => {
  return axios.post(baseURL+'/categories', resourceCategory);
};

const updateResourceCategory = (id, resourceCategory) => {
  return axios.put(baseURL+`/categories/${id}`, resourceCategory);
};

const deleteResourceCategory = (id) => {
  return axios.delete(baseURL+`/categories/${id}`);
};

export default {
  getResourceCategories,
  getResourceCategory,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
};