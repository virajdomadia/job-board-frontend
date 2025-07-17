import React, { useEffect, useState } from "react";
import JobList from "../components/Job/JobList";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { getJobs } from "../services/jobApi";
import { useJobContext } from "../context/JobContext";

const SeekerDashboard = () => {
  const { jobs } = useJobContext();

  return (
    <>
      <Navbar />
      <JobList jobs={jobs} />
      <Footer />
    </>
  );
};

export default SeekerDashboard;
