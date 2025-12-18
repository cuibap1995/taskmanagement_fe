import axios from "axios";

export const createTaskHttp = (payload) => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  const data = axios.post("http://localhost:8000/api/tasks", payload);
//   const data = fetch("http://localhost:8000/api/tasks", {
//     method:"POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: payload ? JSON.stringify(payload) : undefined,
//   });
  console.log(data);
};
export const getTaskByIdHttp = (id) => {
  return axios.get(`/tasks/${id}`);
};
export const updateTaskHttp = (id, payload) => {
  return axios.put(`/tasks/${id}`, payload);
};
