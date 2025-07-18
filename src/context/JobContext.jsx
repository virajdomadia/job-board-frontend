// src/context/JobContext.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  getJobs,
  createJob,
  updateJob as apiUpdateJob,
  deleteJob as apiDeleteJob,
} from "../services/jobApi";
import toast from "react-hot-toast";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data.jobs);
    } catch (error) {
      toast.error("Failed to fetch jobs.");
    }
  };

  // Create a new job
  const postJob = async (formData) => {
    try {
      const res = await createJob(formData);
      setJobs((prev) => [res.data.job, ...prev]); // prepend new job
      toast.success("Job posted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job.");
    }
  };

  const updateJob = async (id, formData) => {
    try {
      const res = await apiUpdateJob(id, formData);
      setJobs((prev) =>
        prev.map((job) => (job._id === id ? res.data.job : job))
      );
      toast.success("Job updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job.");
    }
  };

  const deleteJob = async (id) => {
    try {
      await apiDeleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("Job deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{ jobs, fetchJobs, postJob, updateJob, deleteJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
