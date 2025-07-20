import React, { useState } from "react";

const JobFilters = ({ fetchJobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const handleSearch = () => {
    const filters = {
      ...(searchTerm && { search: searchTerm }),
      ...(type && { type }),
      ...(category && { category }),
      ...(location && { location }),
      ...(sortOrder && { sort: sortOrder }),
      ...(salaryMin && { salaryMin }),
      ...(salaryMax && { salaryMax }),
    };

    fetchJobs(filters);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setType("");
    setCategory("");
    setLocation("");
    setSortOrder("");
    setSalaryMin("");
    setSalaryMax("");
    fetchJobs({});
  };

  return (
    <div className="p-4 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="🔍 Search jobs..."
        className="border rounded p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Job Type</option>
        <option value="Full-time">Full Time</option>
        <option value="Part-time">Part Time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Category</option>
        <option value="Tech">Technology</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="HR">Human Resources</option>
        <option value="Finance">Finance</option>
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Location</option>
        <option value="Remote">Remote</option>
        <option value="On-site">On-site</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Sort By</option>
        <option value="asc">Salary: Low to High</option>
        <option value="desc">Salary: High to Low</option>
        <option value="date">Date Posted</option>
        <option value="relevance">Relevance</option>
      </select>

      <input
        type="number"
        placeholder="Min Salary"
        className="border rounded p-2 w-28"
        value={salaryMin}
        onChange={(e) => setSalaryMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Salary"
        className="border rounded p-2 w-28"
        value={salaryMax}
        onChange={(e) => setSalaryMax(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        🔎 Apply Filters
      </button>

      <button
        onClick={clearFilters}
        className="bg-gray-300 text-black px-4 py-2 rounded"
      >
        🧹 Clear Filters
      </button>
    </div>
  );
};

export default JobFilters;
