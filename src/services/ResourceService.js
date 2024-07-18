import axiosInstance from "../AxiosConfig";

const resourceService = {
  getAllResources: () => axiosInstance.get("/resources/all"),
  getResourceById: (id) => axiosInstance.get(`/resources/${id}`),
  createResources: (resource) => axiosInstance.post("/resources", resource),
  updateResource: (id, resource) =>
    axiosInstance.put(`/resources/${id}`, resource),
  deleteResource: (id) => axiosInstance.delete(`/resources/${id}`),
};

export default resourceService;
