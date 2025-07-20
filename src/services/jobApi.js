import { api } from "./api";

export const createJob = (data) => {
  return api.post("/jobs", data);
};

export const getJobs = (params = {}) => {
  return api.get("/jobs", { params });
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
