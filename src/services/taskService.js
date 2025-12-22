import {
  getTaskByIdHttp,
  createTaskHttp,
  updateTaskHttp,
  searchTaskHttp,
} from "../http/task.http.js";

export const createTask = async (data) => {
  const res = await createTaskHttp(data);
  console.log(res);
  return res.data;
};
export const getTaskById = async (id) => {
  const res = await getTaskByIdHttp(id);
  return res.data;
};
export const updateTask = async (id, payload) => {
  const res = await updateTaskHttp(id, payload);
  return res.data;
};
export const searchTask = async (payload) => {
  const res = await searchTaskHttp(payload);
  return res.data
}
