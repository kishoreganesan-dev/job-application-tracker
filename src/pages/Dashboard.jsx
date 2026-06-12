import { useState, useEffect } from "react";

export default function Dashboard() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editIndex, setEditIndex] = useState(null);

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
  if (!company || !role || !date) {
    alert("Please fill all fields");
    return;
  }

  const newJob = {
    company,
    role,
    date,
    status,
  };

  if (editIndex !== null) {
    const updatedJobs = [...jobs];
    updatedJobs[editIndex] = newJob;
    setJobs(updatedJobs);
    setEditIndex(null);
  } else {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  }

  setCompany("");
  setRole("");
  setDate("");
  setStatus("Applied");
};

  const deleteJob = (indexToDelete) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToDelete);
    setJobs(updatedJobs);
  };
  const editJob = (index) => {
  const job = jobs[index];

  setCompany(job.company);
  setRole(job.role);
  setDate(job.date);
  setStatus(job.status);

  setEditIndex(index);
};

  const appliedCount = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter((job) => job.status === "Interview").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const selectedCount = jobs.filter((job) => job.status === "Selected").length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Application Tracker</h1>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card">
          <h3>{appliedCount}</h3>
          <p>Applied</p>
        </div>

        <div className="stat-card">
          <h3>{interviewCount}</h3>
          <p>Interview</p>
        </div>

        <div className="stat-card">
          <h3>{rejectedCount}</h3>
          <p>Rejected</p>
        </div>

        <div className="stat-card">
          <h3>{selectedCount}</h3>
          <p>Selected</p>
        </div>
      </div>

      {/* INPUTS */}
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Selected</option>
      </select>

      <br /><br />

      <button onClick={addJob}>
  {editIndex !== null ? "Update Job" : "Add Job"}
</button>

      <hr />

      {/* SEARCH + FILTER */}
      <input
        type="text"
        placeholder="Search Company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>

      <br /><br />

      {/* JOB LIST */}
      <h2>Job List</h2>

      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
        jobs
          .filter((job) =>
            job.company.toLowerCase().includes(search.toLowerCase())
          )
          .filter((job) =>
            filterStatus === "All" ? true : job.status === filterStatus
          )
          .map((job, index) => (
            <div key={index}>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Role:</b> {job.role}</p>
              <p><b>Date:</b> {job.date}</p>
              <p>
                <b>Status:</b>{" "}
                <span className={`status ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </p>
              <button onClick={() => editJob(index)}>
  Edit
</button>

{" "}


              <button onClick={() => deleteJob(index)}>Delete</button>
              <hr />
            </div>
          ))
      )}
    </div>
  );
}