import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import JobForm from "../components/Job/JobForm";
import JobList from "../components/Job/JobList";
import AllApplications from "../components/application/AllApplication";
import { useJobContext } from "../context/JobContext";

const EmployerDashboard = () => {
  const { jobs, postJob } = useJobContext();

  return (
    <>
      <Navbar />
      <AllApplications />
      <JobForm onSubmit={postJob} />
      <JobList jobs={jobs} />
      <Footer />
    </>
  );
};

export default EmployerDashboard;
