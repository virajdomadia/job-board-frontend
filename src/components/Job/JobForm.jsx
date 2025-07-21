import React, { useState, useEffect } from "react";

const JobForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    category: "Tech",
    tags: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      ...form,
      salary: Number(form.salary),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    onSubmit(jobData);

    setForm({
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
      type: "Full-time",
      category: "Tech",
      tags: "",
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
        type="number"
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
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      >
        <option value="Tech">Tech</option>
        <option value="Design">Design</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </select>

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

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
