import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import JobForm from "../components/Job/JobForm";
import toast from "react-hot-toast";
import { createJob, getJobs } from "../services/jobApi";
import JobList from "../components/Job/JobList";
import { useJobContext } from "../context/JobContext";

const EmployerDashboard = () => {
  const { jobs, postJob } = useJobContext();
  return (
    <>
      <Navbar />
      <JobForm onSubmit={postJob} />
      <JobList jobs={jobs} />
      <Footer />
    </>
  );
};

export default EmployerDashboard;
