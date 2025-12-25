import {
  getTaskByIdHttp,
  createTaskHttp,
  updateTaskHttp,
  searchTaskHttp,
  getTaskListHttp,
  deleteTaskHttp,
  deleteMultiTaskHttp,
  updateMultiTaskHttp,
} from "../http/task.http.js";

export const createTask = async (data) => {
  const res = await createTaskHttp(data);
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
  return res.data;
};
export const getTaskList = async () => {
  const res = await getTaskListHttp();
  return res.data;
};
export const deleteTask = async (id) => {
  const res = await deleteTaskHttp(id);
  return res.data;
};
export const deleteMultipleTask = async (id) => {
  const res = await deleteMultiTaskHttp(id);
  return res.data;
};
export const updateMultipleTask = async (payload) => {
  const res = await updateMultiTaskHttp(payload);
  return res.data;
};
