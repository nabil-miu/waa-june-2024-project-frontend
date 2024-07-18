import axiosInstance from "../AxiosConfig";

const eventService = {
  getAllEvents: () => axiosInstance.get("/events/all"),
  getEventById: (id) => axiosInstance.get(`/events/${id}`),
  createEvent: (event) => axiosInstance.post("/events", event),
  updateEvent: (id, event) => axiosInstance.put(`/events/${id}`, event),
  deleteEvent: (id) => axiosInstance.delete(`/events/${id}`),
};

export default eventService;
