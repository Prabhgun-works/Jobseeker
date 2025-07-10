import React from 'react';

import { useState } from 'react';
import './Jobs.css';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      description: 'Looking for an experienced Frontend Developer with React expertise.',
      requirements: ['React', 'JavaScript', 'CSS', '3+ years experience'],
      postedDate: '2024-03-20'
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Data Solutions Inc',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90,000 - $130,000',
      description: 'Seeking a Backend Developer with Node.js and database experience.',
      requirements: ['Node.js', 'MongoDB', 'Express', '4+ years experience'],
      postedDate: '2024-03-19'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Design Co',
      location: 'Remote',
      type: 'Contract',
      salary: '$70,000 - $100,000',
      description: 'Looking for a talented UI/UX Designer to join our creative team.',
      requirements: ['Figma', 'Adobe XD', 'User Research', '2+ years experience'],
      postedDate: '2024-03-18'
    }
  ]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Find Your Next Job</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h2>{job.title}</h2>
              <span className="job-type">{job.type}</span>
            </div>
            
            <div className="job-company">{job.company}</div>
            <div className="job-location">{job.location}</div>
            <div className="job-salary">{job.salary}</div>
            
            <p className="job-description">{job.description}</p>
            
            <div className="job-requirements">
              <h3>Requirements:</h3>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="job-footer">
              <span className="posted-date">Posted: {job.postedDate}</span>
              <button className="apply-btn">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 