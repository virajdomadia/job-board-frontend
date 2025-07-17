import React, { useState, useEffect } from "react";

const JobForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
      type: "Full-time",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Job" : "Post New Job"}
      </h2>

      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        {isEdit ? "Update Job" : "Create Job"}
      </button>
    </form>
  );
};

export default JobForm;
