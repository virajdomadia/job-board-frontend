import { api } from "./api";

// ✅ APPLY TO JOB - Updated to use /apply route
export const applyToJob = (jobId, formData) => {
  if (!formData.has("jobId")) {
    formData.append("jobId", jobId);
  }
  return api.post(`/applications/apply`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const checkIfAlreadyApplied = (jobId) => {
  return api.get(`/applications/check/${jobId}`);
};

export const getAllApplications = async () => {
  try {
    const res = await api.get("/applications/employer");
    const apps = res?.data?.applications || res?.data || [];
    return Array.isArray(apps) ? apps : [];
  } catch (error) {
    console.error("Error fetching applications", error);
    return [];
  }
};

export const getMyApplications = () => {
  return api.get("/applications/me");
};

export const updateApplicationStatus = (id, status, notes = "") => {
  return api.put(`/applications/${id}/status`, { status, notes });
};
