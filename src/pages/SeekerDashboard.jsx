import React from "react";
import JobList from "../components/Job/JobList";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useJobContext } from "../context/JobContext";
import JobFilters from "../components/Job/JobFilters";
import MyApplications from "../components/application/MyApplication";

const SeekerDashboard = () => {
  const { jobs, fetchJobs } = useJobContext();

  return (
    <>
      <Navbar />
      <MyApplications />
      <JobFilters fetchJobs={fetchJobs} />
      <JobList jobs={jobs} />
      <Footer />
    </>
  );
};

export default SeekerDashboard;
