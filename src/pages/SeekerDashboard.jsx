import React from "react";
import JobList from "../components/Job/JobList";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const SeekerDashboard = () => {
  return (
    <>
      <Navbar />
      <JobList />
      <Footer />
    </>
  );
};

export default SeekerDashboard;
