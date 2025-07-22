import { api } from "./api";

// ✅ APPLY TO JOB - Updated to use /apply route
export const applyToJob = (jobId, formData) => {
  formData.append("jobId", jobId); // ⬅️ Append jobId to FormData
  return api.post(`/applications/apply`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ CHECK IF ALREADY APPLIED
export const checkIfAlreadyApplied = (jobId) => {
  return api.get(`/applications/check/${jobId}`);
};

// ✅ GET MY APPLICATIONS
export const getMyApplications = () => {
  return api.get("/applications/me");
};

// ✅ UPDATE APPLICATION STATUS (Employer Use)
export const updateApplicationStatus = (id, status) => {
  return api.put(`/applications/${id}/status`, { status });
};
