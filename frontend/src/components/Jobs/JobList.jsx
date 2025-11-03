import React from 'react';

import { useState } from 'react';

import './JobList.css';

export default function JobList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      status: 'open',
      description: 'Looking for a skilled frontend developer...'
    },
    // Add more sample jobs here
  ]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-list-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Job List */}
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className={`status-badge ${job.status}`}>
                {job.status}
              </span>
            </div>
            
            <div className="job-details">
              <p className="company">{job.company}</p>
              <p className="location">{job.location}</p>
              <p className="type">{job.type}</p>
            </div>

            <p className="description">{job.description}</p>

            <div className="job-actions">
              <button className="apply-btn">
                Apply Now
              </button>
              <button className="save-btn">
                Save Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 