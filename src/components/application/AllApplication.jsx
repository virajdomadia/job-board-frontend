import React, { useEffect, useState } from "react";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../../services/applicationApi";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editAppId, setEditAppId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const apps = await getAllApplications();
        setApplications(apps);
      } catch (error) {
        console.error("Failed to fetch applications", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApps =
    statusFilter === "all"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  const handleEditClick = (app) => {
    setEditAppId(app._id);
    setEditStatus(app.status);
    setEditNotes(app.notes || "");
  };

  const handleUpdateStatus = async () => {
    try {
      await updateApplicationStatus(editAppId, editStatus, editNotes);
      const updated = applications.map((app) =>
        app._id === editAppId
          ? { ...app, status: editStatus, notes: editNotes }
          : app
      );
      setApplications(updated);
      setEditAppId(null);
      setEditStatus("");
      setEditNotes("");
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Applications</h2>

      <div className="mb-6">
        <label htmlFor="status" className="mr-2 font-medium">
          Filter by Status:
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : filteredApps.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredApps.map((app) => (
            <li
              key={app._id}
              className="border border-gray-300 p-4 rounded shadow"
            >
              <p>
                <strong>Applicant:</strong> {app.seekerId?.name || "Unknown"}
              </p>
              <p>
                <strong>Email:</strong> {app.seekerId?.email || "N/A"}
              </p>
              <p>
                <strong>Job Title:</strong> {app.jobId?.title || "N/A"}
              </p>
              <p>
                <strong>Company:</strong> {app.jobId?.company || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{app.status}</span>
              </p>
              <p>
                <strong>Notes:</strong> {app.notes || "—"}
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                {app.resume?.cloud ? (
                  <a
                    href={app.resume.cloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  "Not uploaded"
                )}
              </p>

              {/* Edit button */}
              <button
                onClick={() => handleEditClick(app)}
                className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Update Status
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Status update modal */}
      {editAppId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Update Application Status
            </h3>

            <div className="mb-4">
              <label className="block font-medium mb-1">Status</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Notes (optional)</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditAppId(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApplications;
