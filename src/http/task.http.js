import axios from "axios";

export const createTaskHttp = (payload) => {
  const data = axios.post("/api/tasks", payload);
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
