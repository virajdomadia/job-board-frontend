import React, { useEffect, useState } from "react";
import { getJobs } from "../../services/jobApi";
import toast from "react-hot-toast";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [layout, setLayout] = useState("grid");

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

  if (!jobs.length) {
    return <div className="text-center">No jobs available at the moment.</div>;
  }
  return (
    <>
      <div className="mt-8 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Posted Jobs</h2>
          <div className="flex border rounded overflow-hidden">
            <button
              onClick={() => setLayout("list")}
              className={`px-4 py-2 ${
                layout === "list"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={`px-4 py-2 ${
                layout === "grid"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Grid
            </button>
          </div>
        </div>

        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded shadow-sm bg-white space-y-2"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>
                {job.company} — {job.location}
              </p>
              <p>💰 Salary: ₹{job.salary}</p>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-sm text-gray-500">Type: {job.type}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobList;
