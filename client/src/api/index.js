import API from "./axios";

// Auth APIs
export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
};

// Task APIs
export const taskAPI = {
  getTasks: (status) => API.get(`/tasks${status ? `?status=${status}` : ""}`),
  getTask: (id) => API.get(`/tasks/${id}`),
  createTask: (data) => API.post("/tasks", data),
  updateTask: (id, data) => API.put(`/tasks/${id}`, data),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
};
