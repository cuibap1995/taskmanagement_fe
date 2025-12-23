import axios from "@/utils/axios";

export const createTaskHttp = (payload) => {
  return axios.post("/api/tasks", payload);
};
export const getTaskByIdHttp = (id) => {
  return axios.get(`/api/tasks/${id}`);
};
export const updateTaskHttp = (id, payload) => {
  return axios.put(`/api/tasks/${id}`, payload);
};
export const searchTaskHttp = (payload) => {
  return axios.get("api/tasks", { params: payload });
}
export const getTaskListHttp = ()=>{
  return axios.get('/api/tasks');
}
export const deleteTaskHttp = (id)=>{
  return axios.delete(`/api/tasks/${id}`);
}
export const deleteMultiTaskHttp = (id)=>{
  return axios.post('/api/tasks/delete-multiple',{
    task_id: id
  });
}