import axios from "@/utils/axios";

export const createTaskHttp = (payload) => {
  return axios.post("/api/tasks", payload);
};
export const getTaskByIdHttp = (id) => {
  return axios.get(`/tasks/${id}`);
};
export const updateTaskHttp = (id, payload) => {
  return axios.put(`/tasks/${id}`, payload);
};
