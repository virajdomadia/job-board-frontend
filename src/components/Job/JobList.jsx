import React, { useState, useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { useAuthContext } from "../../context/AuthContext";
import JobForm from "./JobForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkIfAlreadyApplied } from "../../services/applicationApi";

const JobList = ({ jobs }) => {
  const [layout, setLayout] = useState("grid");
  const [editingJobId, setEditingJobId] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const { deleteJob, updateJob, fetchJobs } = useJobContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const loggedInUser = user;
  const userId = loggedInUser?.id;

  const isOwner = (job) => {
    const jobEmployerId = job.employerId?._id || job.employerId;
    return loggedInUser?.role === "employer" && jobEmployerId === userId;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        await fetchJobs();
        toast.success("Job deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete job.");
        console.error(error);
      }
    }
  };

  const handleEdit = (job) => {
    setEditingJobId(job._id);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateJob(editingJobId, updatedData);
      setEditingJobId(null);
      await fetchJobs();
      toast.success("Job updated successfully!");
    } catch (error) {
      toast.error("Failed to update job.");
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchJobs();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  useEffect(() => {
    const fetchAppliedStatuses = async () => {
      if (!loggedInUser || loggedInUser.role !== "seeker" || !jobs.length)
        return;

      const results = await Promise.allSettled(
        jobs.map((job) => checkIfAlreadyApplied(job._id))
      );

      const applied = jobs
        .filter(
          (_, i) =>
            results[i].status === "fulfilled" &&
            results[i].value?.data?.applied === true
        )
        .map((job) => job._id);

      setAppliedJobIds(applied);
    };

    fetchAppliedStatuses();
  }, [jobs, loggedInUser]);

  if (!user) {
    return <div className="text-center py-10">Loading user data...</div>;
  }

  if (!jobs.length) {
    return <div className="text-center">No jobs available at the moment.</div>;
  }

  return (
    <div className="mt-8 p-4">
      <div className="flex justify-between items-center mb-4">
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

        <button
          onClick={fetchJobs}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🔄 Refresh Jobs
        </button>
      </div>

      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "space-y-4"
        }
      >
        {jobs.map((job) => {
          const owner = isOwner(job);
          const isEditing = editingJobId === job._id;
          const alreadyApplied = appliedJobIds.includes(job._id);

          return (
            <div
              key={job._id}
              className="border p-4 rounded shadow-sm bg-white space-y-2 relative hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-indigo-600">
                {job.title}
              </h3>
              <p>
                {job.company} — {job.location}
              </p>
              <p>💰 Salary: ₹{job.salary}</p>
              <p className="text-gray-700 line-clamp-3">{job.description}</p>
              <p className="text-sm text-gray-500">Type: {job.type}</p>

              {job.employerId?.name && (
                <p className="text-sm text-gray-400 italic">
                  Posted by: {job.employerId.name}
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate(`/job/${job._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  View Details
                </button>

                {loggedInUser.role === "seeker" && (
                  <button
                    onClick={() => navigate(`/job/${job._id}`)}
                    disabled={alreadyApplied}
                    className={`px-3 py-1 rounded text-sm ${
                      alreadyApplied
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {alreadyApplied ? "Already Applied" : "Apply Now"}
                  </button>
                )}
              </div>

              {owner && (
                <div
                  className="absolute top-2 right-2 flex gap-2 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleEdit(job)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}

              {isEditing && (
                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                  <JobForm isEdit initialData={job} onSubmit={handleUpdate} />
                  <button
                    className="mt-2 text-gray-500 hover:underline text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingJobId(null);
                    }}
                  >
                    Cancel Edit
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
