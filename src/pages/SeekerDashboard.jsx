import React, { useEffect, useState } from "react";
import JobList from "../components/Job/JobList";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { getJobs } from "../services/jobApi";

const SeekerDashboard = () => {
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

  return (
    <>
      <Navbar />
      <JobList jobs={jobs} />
      <Footer />
    </>
  );
};

export default SeekerDashboard;
