// src/context/JobContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getJobs, createJob } from "../services/jobApi";
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

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, fetchJobs, postJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
