import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import JobForm from "../components/Job/JobForm";
import toast from "react-hot-toast";
import { createJob } from "../services/jobApi";

const EmployerDashboard = () => {
  const handleCreateJob = async (formData) => {
    try {
      const res = await createJob(formData);
      toast.success("Job posted successfully!");
      console.log("Created Job:", res.data.job);
      // You can also trigger a job list refresh or redirect here
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };
  return (
    <>
      <Navbar />
      <JobForm onSubmit={handleCreateJob} />
      <Footer />
    </>
  );
};

export default EmployerDashboard;
