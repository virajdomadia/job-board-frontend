import { api } from "./api";

export const createJob = (data) => {
  return api.post("/jobs", data);
};

export const getJobs = () => {
  return api.get("/jobs");
};

export const getJobById = (id) => {
  return api.get(`/jobs/${id}`);
};

export const updateJob = (id, data) => {
  return api.put(`/jobs/${id}`, data);
};

export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}`);
};
