import fileDownload from "js-file-download";
import axiosInstance from "../AxiosConfig";

const resourceService = {
  getAllResources: () => axiosInstance.get("/resources/all"),
  getResourceById: (id) => axiosInstance.get(`/resources/${id}`),
  createResource: (resource) => axiosInstance.post("/resources", resource),
  updateResource: (id, resource) =>
    axiosInstance.put(`/resources/${id}`, resource),
  deleteResource: (id) => axiosInstance.delete(`/resources/${id}`),
  uploadFile: (file) => {
    console.log("here");
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post("/resource", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        userId: 1,
      },
    });
  },
  getFile: (name) =>
    axiosInstance
      .get(`/resource/files/${name}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, name);
      }),
};

export default resourceService;
