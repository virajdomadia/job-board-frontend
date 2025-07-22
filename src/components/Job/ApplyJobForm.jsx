// src/components/jobs/ApplyJobForm.jsx
import React, { useState } from "react";
import { applyToJob } from "../../api/applicationApi";

const ApplyJobForm = ({ jobId, onSuccess }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("coverLetter", coverLetter);
    if (resume) formData.append("resume", resume);

    try {
      const res = await applyToJob(formData);
      setMsg(res.data.message);
      setCoverLetter("");
      setResume(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      setMsg(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded">
      <h3 className="font-bold text-lg">Apply to this job</h3>

      <textarea
        placeholder="Cover Letter (required)"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        required
        className="w-full border rounded p-2"
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResume(e.target.files[0])}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Apply Now"}
      </button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
};

export default ApplyJobForm;
