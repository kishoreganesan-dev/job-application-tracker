import { useState, useEffect } from "react";

export default function Dashboard() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");

  const [jobs, setJobs] = useState(() => {
  const savedJobs = localStorage.getItem("jobs");
  return savedJobs ? JSON.parse(savedJobs) : [];
});

 

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (!company || !role) {
      alert("Please fill all fields");
      return;
    }

    const newJob = {
      company,
      role,
      status,
    };

console.log("New Job:", newJob);

   setJobs((prevJobs) => [...prevJobs, newJob]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  const deleteJob = (indexToDelete) => {
    const updatedJobs = jobs.filter(
      (_, index) => index !== indexToDelete
    );

    setJobs(updatedJobs);
  };
const appliedCount = jobs.filter(
  (job) => job.status === "Applied"
).length;

const interviewCount = jobs.filter(
  (job) => job.status === "Interview"
).length;

const rejectedCount = jobs.filter(
  (job) => job.status === "Rejected"
).length;

const selectedCount = jobs.filter(
  (job) => job.status === "Selected"
).length;
  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Application Tracker</h1>
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

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Selected</option>
      </select>

      <br />
      <br />

      <button onClick={addJob}>Add Job</button>

      <hr />
      <input
  type="text"
  placeholder="Search Company..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<br />
<br />

      <h2>Job List</h2>

      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
       jobs
  .filter((job) =>
    job.company.toLowerCase().includes(search.toLowerCase())
  )
  .map((job, index) => (
          <div key={index}>
            <p>
              <b>Company:</b> {job.company}
            </p>

            <p>
              <b>Role:</b> {job.role}
            </p>

           <p>
  <strong>Status:</strong>
  <span className={`status ${job.status.toLowerCase()}`}>
    {job.status}
  </span>
</p>

            <button onClick={() => deleteJob(index)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}