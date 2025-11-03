import React from 'react';

import { useState } from 'react';
import './Applications.css';

export default function Applications() {
  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      company: 'Tech Corp',
      appliedDate: '2024-03-20',
      status: 'Pending',
      lastUpdated: '2024-03-20'
    },
    {
      id: 2,
      jobTitle: 'Backend Developer',
      company: 'Data Solutions Inc',
      appliedDate: '2024-03-19',
      status: 'Under Review',
      lastUpdated: '2024-03-21'
    },
    {
      id: 3,
      jobTitle: 'UI/UX Designer',
      company: 'Creative Design Co',
      appliedDate: '2024-03-18',
      status: 'Interview Scheduled',
      lastUpdated: '2024-03-22'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#f59e0b';
      case 'under review':
        return '#3b82f6';
      case 'interview scheduled':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      case 'accepted':
        return '#059669';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1>My Applications</h1>
        <p className="applications-count">
          {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}
        </p>
      </div>

      <div className="applications-list">
        {applications.map(application => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div className="application-title">
                <h2>{application.jobTitle}</h2>
                <p className="company-name">{application.company}</p>
              </div>
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(application.status) }}
              >
                {application.status}
              </div>
            </div>

            <div className="application-details">
              <div className="detail-item">
                <span className="detail-label">Applied:</span>
                <span className="detail-value">{application.appliedDate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{application.lastUpdated}</span>
              </div>
            </div>

            <div className="application-actions">
              <button className="view-details-btn">View Details</button>
              <button className="withdraw-btn">Withdraw Application</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 