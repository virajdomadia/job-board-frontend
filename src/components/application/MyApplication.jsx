import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applicationApi";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getMyApplications()
      .then((res) => {
        const apps = Array.isArray(res.data)
          ? res.data
          : res.data.applications || [];

        setApplications(apps);
      })
      .catch((err) => console.error("Error fetching my applications", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Job Applications</h2>
      {applications.map((app) => (
        <div key={app._id} className="p-4 border rounded mb-4 shadow-md">
          <p>
            <strong>Job:</strong> {app.jobId?.title || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {app.jobId?.company || "N/A"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                app.status === "selected"
                  ? "text-green-600"
                  : app.status === "rejected"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {app.status}
            </span>
          </p>
          <p>
            <strong>Applied on:</strong>{" "}
            {new Date(app.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Status Updated on:</strong>{" "}
            {app.statusUpdatedAt
              ? new Date(app.statusUpdatedAt).toLocaleDateString()
              : "Not updated yet"}
          </p>
          {app.notes && (
            <p>
              <strong>Employer Notes:</strong> {app.notes}
            </p>
          )}
          <a
            href={`/job/${app.jobId?._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-indigo-600 hover:underline"
          >
            View Job Details →
          </a>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
