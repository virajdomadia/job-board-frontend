import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import JobForm from "../components/Job/JobForm";
import toast from "react-hot-toast";
import { createJob, getJobs } from "../services/jobApi";
import JobList from "../components/Job/JobList";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data.jobs);
      toast.success("Jobs fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch jobs.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (formData) => {
    try {
      const res = await createJob(formData);
      toast.success("Job posted successfully!");
      console.log("Created Job:", res.data.job);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };
  return (
    <>
      <Navbar />
      <JobForm onSubmit={handleCreateJob} />
      <JobList jobs={jobs} />
      <Footer />
    </>
  );
};

export default EmployerDashboard;
