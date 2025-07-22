import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobApi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { applyToJob, checkIfAlreadyApplied } from "../services/applicationApi";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { user } = useAuthContext();
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

    const checkApplicationStatus = async () => {
      try {
        if (user?.role === "seeker") {
          const res = await checkIfAlreadyApplied(id);
          setAlreadyApplied(res.data.alreadyApplied);
        }
      } catch (error) {
        console.error("Error checking application status");
      }
    };

    fetchJob();
    checkApplicationStatus();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) return toast.error("Please login to apply.");
    if (user.role !== "seeker")
      return toast.error("Only job seekers can apply.");

    const formData = new FormData();
    formData.append("coverLetter", coverLetter);
    if (resume) formData.append("resume", resume);

    try {
      await applyToJob(id, formData);
      toast.success("Application submitted!");
      setAlreadyApplied(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed.");
    }
  };

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

        {user?.role === "seeker" && (
          <div className="bg-gray-100 p-4 rounded-lg mt-8">
            <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>

            <label className="block mb-2 font-medium">Cover Letter:</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              rows={4}
              placeholder="Write your message to the employer..."
            ></textarea>

            <label className="block mb-2 font-medium">
              Upload Resume (PDF):
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="mb-4"
            />

            <button
              onClick={handleApply}
              disabled={alreadyApplied}
              className={`${
                alreadyApplied ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded transition`}
            >
              {alreadyApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JobDetail;
