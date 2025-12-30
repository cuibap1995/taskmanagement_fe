import axios from "@/utils/axios";

export const GetAllProjectHttp = () => {
  return axios.get("api/project");
};
export const GetProjectByIdHttp = (id) => {
  return axios.get(`api/project/${id}`);
};
export const UpdateProjectHttp = (id, payload) => {
  return axios.post(`api/project/${id}`, payload);
};
