import React, { useState, useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { useAuthContext } from "../../context/AuthContext";
import JobForm from "./JobForm"; // make sure the path is correct

const JobList = ({ jobs }) => {
  const [layout, setLayout] = useState("grid");
  const [editingJobId, setEditingJobId] = useState(null); // holds ID of job being edited
  const { deleteJob, updateJob } = useJobContext(); // make sure updateJob exists in your context
  const { user } = useAuthContext();

  const loggedInUser = user?.user;
  const userId = loggedInUser?.id;

  useEffect(() => {
    console.log("🔐 Logged in user:", loggedInUser);
    console.log("📦 Jobs received:", jobs);
  }, [loggedInUser, jobs]);

  const isOwner = (job) => {
    const match =
      loggedInUser?.role === "employer" && job.employerId?._id === userId;
    console.log(`🔍 Checking ownership for job ${job._id}`);
    console.log("Job.employerId._id:", job.employerId?._id);
    console.log("User._id:", userId);
    console.log("Is owner?", match);
    return match;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      console.log("🗑 Deleting job with ID:", id);
      deleteJob(id);
    }
  };

  const handleEdit = (job) => {
    console.log("✏️ Editing job:", job);
    setEditingJobId(job._id); // open the edit form for this job
  };

  const handleUpdate = async (updatedData) => {
    console.log("💾 Submitting update for job:", editingJobId);
    await updateJob(editingJobId, updatedData); // context should have this
    setEditingJobId(null); // hide the form after update
  };

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
