import React, { useState, useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { useAuthContext } from "../../context/AuthContext";
import JobForm from "./JobForm";
import toast from "react-hot-toast";

const JobList = ({ jobs }) => {
  const [layout, setLayout] = useState("grid");
  const [editingJobId, setEditingJobId] = useState(null);
  const { deleteJob, updateJob, fetchJobs } = useJobContext(); // ✅ FIXED
  const { user } = useAuthContext();

  const loggedInUser = user;
  const userId = loggedInUser?.id;

  // Handle edge case where user hasn't loaded yet
  if (!user || !loggedInUser) {
    return <div className="text-center py-10">Loading user data...</div>;
  }

  useEffect(() => {
    console.log("🔐 Logged in user:", loggedInUser);
    console.log("📦 Jobs received:", jobs);
  }, [loggedInUser, jobs]);

  // ✅ FIXED: Normalize employerId check
  const isOwner = (job) => {
    const jobEmployerId = job.employerId?._id || job.employerId;
    const match = loggedInUser?.role === "employer" && jobEmployerId === userId;
    console.log(`🔍 Checking ownership for job ${job._id}`);
    console.log("Job.employerId:", jobEmployerId);
    console.log("User._id:", userId);
    console.log("Is owner?", match);
    return match;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        console.log("🗑 Deleting job with ID:", id);
        await deleteJob(id);
        await fetchJobs(); // ✅ Refresh jobs
        toast.success("Job deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete job.");
        console.error(error);
      }
    }
  };

  const handleEdit = (job) => {
    console.log("✏️ Editing job:", job);
    setEditingJobId(job._id);
  };

  const handleUpdate = async (updatedData) => {
    try {
      console.log("💾 Submitting update for job:", editingJobId);
      await updateJob(editingJobId, updatedData);
      setEditingJobId(null);
      await fetchJobs(); // ✅ Refresh jobs
      toast.success("Job updated successfully!");
    } catch (error) {
      toast.error("Failed to update job.");
      console.error(error);
    }
  };

  // ✅ Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("⏱ Auto-refreshing jobs...");
      fetchJobs();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchJobs]);

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

        {/* ✅ Manual Refresh Button */}
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

          return (
            <div
              key={job._id}
              className="border p-4 rounded shadow-sm bg-white space-y-2 relative"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>
                {job.company} — {job.location}
              </p>
              <p>💰 Salary: ₹{job.salary}</p>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-sm text-gray-500">Type: {job.type}</p>

              {job.employerId?.name && (
                <p className="text-sm text-gray-400 italic">
                  Posted by: {job.employerId.name}
                </p>
              )}

              {owner && (
                <div className="absolute top-2 right-2 flex gap-2">
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
                <div className="mt-4">
                  <JobForm isEdit initialData={job} onSubmit={handleUpdate} />
                  <button
                    className="mt-2 text-gray-500 hover:underline text-sm"
                    onClick={() => setEditingJobId(null)}
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
