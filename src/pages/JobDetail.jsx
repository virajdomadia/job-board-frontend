import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobApi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import toast from "react-hot-toast";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (err) {
        toast.error("Failed to load job details.");
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <div className="text-center mt-20">Job not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Go Back
        </button>

        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-600 mb-2">{job.company}</p>
        <p className="text-gray-500 mb-6">{job.location}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Details</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Category: {job.category}</li>
            <li>Type: {job.type}</li>
            <li>Salary: ₹{job.salary}</li>
            <li>Posted on: {new Date(job.createdAt).toLocaleDateString()}</li>
          </ul>
        </div>

        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Apply Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetail;
